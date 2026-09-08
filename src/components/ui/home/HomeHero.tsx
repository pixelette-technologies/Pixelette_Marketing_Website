import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import { heroCopy } from "@/data/home";
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
    //
    // --- 8 Sep 2026 brief ---------------------------------------------------
    // TWO EARLIER DECISIONS ARE DELIBERATELY REVERSED HERE, both of them by
    // the brief rather than by taste, and both recorded rather than quietly
    // overwritten.
    //
    // There is an EYEBROW now. Phase E left it out because writing one was
    // Trap 01 — inventing copy to complete a pattern — and it was reverted
    // twice on the Certified conversion for exactly that. The brief supplies
    // the words, so the trap does not apply: this is transcription, not
    // invention. It is a <p>, NOT a <Heading>, because a heading above the h1
    // inverts the document outline.
    //
    // There are TWO CALLS TO ACTION now. Phase E shipped one because a second
    // was new content; the brief specifies both, and pairs them everywhere the
    // primary appears. The labels are held to "Build my growth plan" and "See
    // client results" in both hero and close — the brief is explicit that
    // mixing labels between the two positions is worse than either label.
    //
    // The headline itself is untouched. It is the one thing the brief's
    // executive decision says to keep.
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
              <Text className='eyebrow'>{heroCopy.eyebrow}</Text>

              <Heading className='h1' level={1}>
                Marketing that matters
              </Heading>
              <Heading className='h1 lowercase' level={2}>
                to your bottom line
              </Heading>

              <Text className='lead'>{heroCopy.lead}</Text>
              <Text className='body'>{heroCopy.reach}</Text>

              <div className='heroHome__actions'>
                <Link href={heroCopy.primaryCta.to}>
                  <Button className='primary'>
                    {heroCopy.primaryCta.label}
                  </Button>
                </Link>
                <Link href={heroCopy.secondaryCta.to} className='btn2'>
                  {heroCopy.secondaryCta.label}
                </Link>
              </div>

              <Text className='small'>{heroCopy.closing}</Text>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
