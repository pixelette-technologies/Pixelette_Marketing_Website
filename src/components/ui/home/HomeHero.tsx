import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";
import Link from "next/link";

// The mouse-parallax that used to live here is gone: a useState offset, a
// handleMouseMove reading getBoundingClientRect, and five inline transform and
// transition styles. The five images stay — they are the hero widget and the
// most distinctive thing on the page — and they do not move, because their
// positioning is entirely SCSS-owned.
//
// Worth recording: all five images shared the SAME offset and differed only in
// transition duration (0.1s, 0.5s, 0.4s, 0.5s, 0.5s). There was no per-layer
// depth multiplier, so the apparent parallax depth was entirely an artefact of
// staggered easing, at an amplitude of 10px.
//
// With the state and the handler gone nothing here is interactive, so the file
// drops "use client" and becomes a server component.

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
    <div className='wash'>
      <Container className='main'>
        <div className='heroHome'>
          <div>
            <section>
              {/* Men Picture */}
              <Image
                src='/home/hh_image_1.webp'
                alt=''
                width={402}
                priority
                height={408}
              />
              {/* Building Image */}
              <Image
                src='/home/hh_image_2.webp'
                alt=''
                width={342}
                priority
                height={362}
              />
              {/* Back ground round */}
              <Image
                src='/home/hh_image_3.webp'
                alt=''
                width={353}
                priority
                height={354}
              />
              {/* Laptop */}
              <Image
                src='/home/hh_image_4.webp'
                alt=''
                width={199}
                priority
                height={218}
              />
              {/* Clock tower */}
              <Image
                src='/home/hh_image_6.webp'
                alt=''
                width={162}
                priority
                height={628}
              />
            </section>
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
              <Heading
                className='hero font_family_glory uppercase'
                level={1}
              >
                Marketing That Matters
              </Heading>
              <Heading
                className='hero font_family_glory uppercase'
                level={2}
              >
                to Your Bottom Line
              </Heading>
              <Text className='primary'>
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
