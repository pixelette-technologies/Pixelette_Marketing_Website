import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";
import Link from "next/link";
import HeroCollage from "./HeroCollage";

// D2 removed the mouse-parallax as decoration — a useState offset, a
// handleMouseMove reading getBoundingClientRect, and five inline transform and
// transition styles. Worth keeping on the record: all five images shared the
// SAME offset and differed only in transition duration (0.1s, 0.5s, 0.4s, 0.5s,
// 0.5s), so there was no per-layer depth multiplier and the apparent depth was
// entirely an artefact of staggered easing, at an amplitude of 10px.
//
// Phase F. The user asked for it back, and the hero is theirs to call by eye.
// It is rebuilt properly this time, with real per-layer depth, in HeroCollage.
//
// THIS FILE STAYS A SERVER COMPONENT. The collage is the only interactive part
// of the hero and it now owns its own "use client" boundary, so the headline,
// the standfirst and the call to action are still server-rendered rather than
// shipping as client JavaScript because the picture beside them moves.

export default function HomeHero() {
  return (
    // Phase E, the hero ground: the guide's centred light wash, its default
    // front-page treatment. The wrapper exists so the gradient runs full-bleed
    // behind the container rather than being clipped to it. Interior pages take
    // the offset .wash-left variant.
    //
    // No eyebrow. HomeHero has no such copy and writing one is Trap 01, which
    // was reverted twice on the Certified conversion. One button, not the
    // guide's action pair, because a second CTA is new content. Both headings
    // keep their own elements: merging them into a single h1 would change the
    // DOM structure of content.
    //
    // Phase F. The hero STAYS SPLIT — left collage, right copy — rather than
    // going centred like Certified's. Chosen by the user on 1 Sep: the collage
    // is the most distinctive thing on the site and centring the hero would
    // have cost it. What changed is only the type.
    //
    // Both headings carried `hero font_family_glory uppercase`, which reached
    // the DOM as heading_hero — one of the twelve legacy variants, and mapped
    // to h1 on the guide's scale. So the type was right and the CASE was the
    // problem: 64px of Newsreader at negative tracking, set in capitals.
    //
    // They are .h1 now, and sentence case. The accent also moves from the first
    // line to the second, which is the guide's own hero device — the statement
    // in ink, the payoff in the brand tone. Certified does exactly this with
    // "We fix that in 10 weeks."
    <div className='wash'>
      <Container className='main'>
        <div className='heroHome'>
          <div>
            <HeroCollage />
          </div>

          <Image
            src='/home/heroImageForMobile.png'
            alt=''
            height={480}
            width={520}
            priority
          />

          {/* bg_tertiary dropped: the wash is the ground now, and a second
              band behind the copy fought the gradient. */}
          <section>
            <div>
              <Heading className='h1' level={1}>
                Marketing that matters
              </Heading>
              <Heading className='h1' level={2}>
                to your bottom line
              </Heading>
              <Text className='lead'>
                Pixelette Marketing delivers precision driven marketing for
                Fintech, SaaS, Web3, tech products and platforms, and more. We
                believe your industry deserves strategies as innovative as your
                solutions. Take the guesswork out of growth by requesting your
                strategy proposal today and{" "}
                <span className='text_primary--bold heroHome__emphasis'>
                  start achieving ROI you can see!
                </span>
              </Text>
              <Link href='/contactus'>
                <Button className='primary'>Book A Call</Button>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
