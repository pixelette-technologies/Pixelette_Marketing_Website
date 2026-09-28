import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/common";
import { heroCopy } from "@/data/home";
import GrowthEngine from "./GrowthEngine";

// THE HOME HERO — rebuilt 28 Sep 2026 to the creative transformation brief,
// which supersedes every earlier instruction not to redesign it.
//
// WHAT WENT. The five-image collage and its pointer parallax (HeroCollage, the
// second registered motion surface), the mobile stand-in image, the `reach`
// sentence, and the headline's split across an <h1> and an <h2>. That split
// put half the proposition in a second-level heading, so the document outline
// read "Marketing that matters" as the page's title and "to your bottom line"
// as its first section. It is one <h1> now, on two lines.
//
// WHAT STAYED. The headline, word for word — the brief is explicit that it is
// not to be weakened — the eyebrow, and the primary CTA.
//
// THE TYPOGRAPHIC SEQUENCE (brief section 5) IS CSS, NOT JAVASCRIPT. The last
// words of the headline run pipeline. → conversion. → revenue. → bottom line.
// once, on load, and stop. It is done with a clipped reel and one keyframe
// animation, so it needs no hydration, cannot loop, and cannot flash: the
// server sends the finished headline and the animation only borrows it for two
// seconds. The three passing words are CSS generated content with empty
// alternative text, so the <h1> a search engine or a screen reader gets is
// exactly "Marketing that matters to your bottom line." Under a reduce
// preference there is no animation at all and the reel sits on the last word.
//
// This file stays a server component. The engine owns its own client boundary.

export default function HomeHero() {
  const { eyebrow, headline, sequence, lead, primaryCta, secondaryCta, principles } =
    heroCopy;

  // A CSS string, with \A as the line break. The words live in the copy file
  // with everything else the brief supplied; the stylesheet only moves them.
  const reel = {
    "--hero-reel": `"${sequence.join("\\A ")}"`
  } as CSSProperties;

  return (
    <div className='homeHero wash'>
      <Container className='main'>
        <div className='homeHero__grid'>
          <div className='homeHero__copy'>
            <p className='eyebrow'>{eyebrow}</p>

            <h1 className='h1 homeHero__title'>
              <span className='homeHero__line'>{headline.lead}</span>{" "}
              <span className='homeHero__line homeHero__line--accent'>
                {headline.tail}{" "}
                <span className='homeHero__window'>
                  <span className='homeHero__reel' style={reel}>
                    {headline.settle}
                  </span>
                </span>
              </span>
            </h1>

            <p className='lead homeHero__lead'>{lead}</p>

            <div className='homeHero__actions'>
              <Link href={primaryCta.to} className='btn btn--arrow'>
                {primaryCta.label}
                <span aria-hidden='true'>→</span>
              </Link>
              <Link href={secondaryCta.to} className='btn2'>
                {secondaryCta.label}
              </Link>
            </div>

            <ul className='homeHero__principles'>
              {principles.map(line => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className='homeHero__engine'>
            <GrowthEngine />
          </div>
        </div>
      </Container>
    </div>
  );
}
