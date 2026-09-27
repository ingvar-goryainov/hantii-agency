/**
 * hantii.com edge Worker (docs/design.md §10). Runs before static assets on every request:
 * canonical host and HTTPS redirects, then security, cache and robots headers on asset responses.
 */
import { APEX, SECURITY_HEADERS, cacheControl } from "./policy";

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const isProdHost = url.hostname === APEX || url.hostname === `www.${APEX}`;

    if (isProdHost && (url.protocol === "http:" || url.hostname !== APEX)) {
      url.protocol = "https:";
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(name, value);
    if (asset.ok) response.headers.set("Cache-Control", cacheControl(url.pathname, asset.headers.get("content-type")));
    if (url.hostname !== APEX) response.headers.set("X-Robots-Tag", "noindex");
    return response;
  },
} satisfies ExportedHandler<Env>;
