import { describe, expect, it } from "vitest";
import worker from "./index";
import { SECURITY_HEADERS } from "./policy";

type Handler = { fetch: (request: Request, env: Env) => Promise<Response> };
const handler = worker as unknown as Handler;

function envWith(body = "ok", init: ResponseInit = { headers: { "content-type": "text/html; charset=utf-8" } }) {
  const seen: string[] = [];
  const env = {
    ASSETS: {
      fetch: async (input: Request | string) => {
        seen.push(typeof input === "string" ? input : input.url);
        return new Response(body, init);
      },
    },
  } as unknown as Env;
  return { env, seen };
}

const get = (url: string, env: Env) => handler.fetch(new Request(url), env);

describe("redirects", () => {
  it("sends www to the apex over https, keeping path and query", async () => {
    const { env, seen } = envWith();
    const res = await get("https://www.hantii.com/any/path?x=1", env);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("https://hantii.com/any/path?x=1");
    expect(seen).toHaveLength(0);
  });

  it("upgrades http on the apex to https", async () => {
    const { env } = envWith();
    const res = await get("http://hantii.com/team?ref=x", env);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("https://hantii.com/team?ref=x");
  });

  it("upgrades http on www straight to the https apex", async () => {
    const { env } = envWith();
    const res = await get("http://www.hantii.com/", env);
    expect(res.headers.get("location")).toBe("https://hantii.com/");
  });

  it("does not redirect preview hosts", async () => {
    const { env, seen } = envWith();
    const res = await get("http://abc-hantii.example.workers.dev/", env);
    expect(res.status).toBe(200);
    expect(seen).toHaveLength(1);
  });
});

describe("asset responses", () => {
  it("serves the apex with security headers and no-cache HTML", async () => {
    const { env } = envWith();
    const res = await get("https://hantii.com/", env);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("ok");
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) expect(res.headers.get(name)).toBe(value);
    expect(res.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate");
    expect(res.headers.get("x-robots-tag")).toBeNull();
  });

  it("keeps the CSP free of inline scripts", () => {
    const csp = SECURITY_HEADERS["Content-Security-Policy"];
    expect(csp).toContain("script-src 'self';");
    expect(csp).not.toMatch(/script-src[^;]*unsafe-inline/);
  });

  it("marks hashed build assets immutable", async () => {
    const { env } = envWith("x", { headers: { "content-type": "text/javascript" } });
    const res = await get("https://hantii.com/_astro/site.abc123.js", env);
    expect(res.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
  });

  it("gives other static files a one-day cache", async () => {
    const { env } = envWith("x", { headers: { "content-type": "image/png" } });
    const res = await get("https://hantii.com/og-image.png", env);
    expect(res.headers.get("cache-control")).toBe("public, max-age=86400");
  });

  it("passes 404s through with headers but without a cache rule", async () => {
    const { env } = envWith("missing", { status: 404, headers: { "content-type": "text/html" } });
    const res = await get("https://hantii.com/nope", env);
    expect(res.status).toBe(404);
    expect(res.headers.get("x-frame-options")).toBe("DENY");
    expect(res.headers.get("cache-control")).toBeNull();
  });

  it("marks non-production hosts noindex", async () => {
    const { env } = envWith();
    const res = await get("https://feat-site-hantii.example.workers.dev/", env);
    expect(res.headers.get("x-robots-tag")).toBe("noindex");
  });
});
