/**
 * Host, header and cache policy for the hantii.com Worker (docs/design.md §10.3).
 * Kept out of index.ts: the Workers runtime treats every named export of the main
 * module as an entrypoint, so the main module may only export handlers.
 */

export const APEX = "hantii.com";

export const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "X-Frame-Options": "DENY",
};

export function cacheControl(pathname: string, contentType: string | null): string {
  if (pathname.startsWith("/_astro/")) return "public, max-age=31536000, immutable";
  if (contentType?.includes("text/html")) return "public, max-age=0, must-revalidate";
  return "public, max-age=86400";
}
