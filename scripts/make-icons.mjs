/**
 * Generates favicons, the Apple touch icon and the social share image into public/
 * from the brand PNGs (docs/design.md §11). Run with `npm run icons` and commit the output.
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = new URL("../", import.meta.url);
const out = (name) => new URL(`public/${name}`, root);
const mark = await readFile(new URL("src/assets/brand/hantii-mark.png", root));
const logo = await readFile(new URL("src/assets/brand/hantii-logo.png", root));

// Values from src/styles/tokens.css (surface, surface-blush).
const SURFACE = "#ffffff";
const SURFACE_BLUSH = "#ffedf2";

// The HeroFrame blob (docs/design.md §7.6); its bounding box is about x 462–710, y 215–453.
const BLOB =
  "M 634.039062 348.203125 L 674.246094 314.117188 L 675.871094 312.851562 C 699.273438 294.363281 714.417969 269.9375 709.125 250.265625 C 705.558594 237.039062 695.824219 221.09375 674.304688 219.589844 L 515.527344 216.128906 C 499.921875 215.039062 486.695312 217.140625 481.203125 230.714844 C 479.917969 233.894531 479.253906 237.292969 479.253906 240.726562 C 479.238281 260.105469 535.214844 272.3125 535.121094 294.503906 C 534.992188 326.699219 462.867188 362.847656 462.570312 400.964844 C 462.480469 412.628906 463.597656 418.386719 468.394531 426.042969 C 473.929688 434.875 493.507812 439.375 501.550781 440.222656 L 634.707031 452.128906 C 647.089844 452.996094 655.777344 447.855469 658.863281 438.597656 C 662.285156 428.335938 657.648438 420.929688 653.21875 417.65625 L 624.429688 397.441406 C 618.515625 393.269531 614.128906 390.152344 611.277344 388.097656 C 604.1875 382.304688 604.808594 374.542969 613.164062 368.707031 Z";

/** The mark centred on a square transparent canvas. */
async function squareMark(size, padding = 0) {
  const inner = Math.round(size * (1 - 2 * padding));
  const resized = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: resized, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const [ico16, ico32, ico48] = await Promise.all([squareMark(16), squareMark(32), squareMark(48)]);
await writeFile(out("favicon-32.png"), ico32);
await writeFile(out("favicon-48.png"), ico48);
await writeFile(out("favicon.ico"), await pngToIco([ico16, ico32, ico48]));

const touchMark = await squareMark(180, 0.12);
await writeFile(
  out("apple-touch-icon.png"),
  await sharp({ create: { width: 180, height: 180, channels: 4, background: SURFACE } })
    .composite([{ input: touchMark }])
    .flatten({ background: SURFACE })
    .png({ compressionLevel: 9 })
    .toBuffer(),
);

// Share image: white ground, the blush blob to the right, the lockup on the left.
const W = 1200;
const H = 630;
const blobSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="${SURFACE}"/>` +
    `<path d="${BLOB}" fill="${SURFACE_BLUSH}" transform="translate(640 40) scale(2.3) translate(-462 -215)"/>` +
    `</svg>`,
);
const lockup = await sharp(logo).resize({ width: 640 }).png().toBuffer();
const lockupMeta = await sharp(lockup).metadata();
await writeFile(
  out("og-image.png"),
  await sharp(blobSvg)
    .composite([{ input: lockup, left: 96, top: Math.round((H - lockupMeta.height) / 2) }])
    .flatten({ background: SURFACE })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer(),
);

console.log("Wrote public/favicon.ico, favicon-32.png, favicon-48.png, apple-touch-icon.png, og-image.png");
