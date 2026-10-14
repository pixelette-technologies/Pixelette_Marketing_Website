import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { heroCopy } from "@/data/home";
import {
  companyFactLine,
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  SITE_NAME
} from "@/data/site";
import { ogPalette } from "@/lib/ogPalette";

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Header logo is 8.0625rem × 3rem (129×48). ~2.5× that height so the mark
// holds next to a ~62px headline. Intrinsic artwork is 272×80.
const LOGO_HEIGHT = 120;
const LOGO_WIDTH = Math.round(LOGO_HEIGHT * (272 / 80));

const ogDir = join(process.cwd(), "src", "app", "_og");

// Same SVG the header's LogoBlack renders. Space in the filename is legacy;
// do not invent a second mark.
const logoSvg = readFileSync(join(process.cwd(), "public", "logo (2).svg"));
const logoSrc = `data:image/svg+xml;base64,${logoSvg.toString("base64")}`;

// Same families as layout.tsx (Newsreader display, Outfit body). Bundled as
// TTF so ImageResponse does not depend on a network fetch at build time.
const newsreader = readFileSync(join(ogDir, "Newsreader-Regular.ttf"));
const outfit = readFileSync(join(ogDir, "Outfit-Regular.ttf"));

const [line1, line2, line3] = heroCopy.ogHeadline;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          // Soft brand wash — same stops as `.wash` / --color-brand-wash → page.
          background: `linear-gradient(160deg, ${ogPalette.wash} 0%, ${ogPalette.tint} 38%, ${ogPalette.page} 72%)`,
          fontFamily: "Newsreader"
        }}
      >
        <img
          src={logoSrc}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          alt={SITE_NAME}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 62,
            lineHeight: 1.05,
            letterSpacing: "-0.024em",
            color: ogPalette.ink,
            fontWeight: 400
          }}
        >
          <div style={{ display: "flex" }}>{line1}</div>
          <div style={{ display: "flex" }}>{line2}</div>
          <div style={{ display: "flex", color: ogPalette.brand }}>{line3}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Outfit",
            fontSize: 24,
            lineHeight: 1.3,
            color: ogPalette.muted,
            fontWeight: 400
          }}
        >
          {companyFactLine()}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreader,
          style: "normal",
          weight: 400
        },
        {
          name: "Outfit",
          data: outfit,
          style: "normal",
          weight: 400
        }
      ]
    }
  );
}
