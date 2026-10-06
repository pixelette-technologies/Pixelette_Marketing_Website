"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { insightsHero } from "@/data/insights/insights";

// /blog-list, 01 Hero. 30 Sep 2026, to the final Insights brief.
//
// THE COLLAGE IS BUILT HERE, NOT SUPPLIED. The brief asks for "the revised
// collage-style hero"; no revised asset was supplied, so it is composed in code
// from the one photograph in the repo that is a real discussion scene — two
// colleagues of different ethnicities working over printed charts — cut out in
// greyscale on the site's pink disc, the same cut-out language as the old
// heroImageAbout collage, with paper pieces layered over it. Replacing it with
// a supplied collage is one <Image> and the four layers below.
//
// MOTION, ALL OF IT OPTIONAL. The copy rises in once on load. On a fine pointer
// the collage's layers drift a few pixels apart with the pointer (gentle
// parallax, eased by a CSS transition, nothing on a loop) and settle back when
// it leaves. Under prefers-reduced-motion every motion rule is off in the SCSS
// and the handler below does nothing.

type Layer = HTMLDivElement | null;

export default function InsightsHero() {
  const stage = useRef<Layer>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.style.setProperty("--ix-px", x.toFixed(3));
    el.style.setProperty("--ix-py", y.toFixed(3));
  };

  const leave = () => {
    stage.current?.style.setProperty("--ix-px", "0");
    stage.current?.style.setProperty("--ix-py", "0");
  };

  return (
    <div className='wash-left'>
      <Container className='main'>
        <header className='ixHero'>
          <div className='ixHero__copy'>
            <Text className='eyebrow'>{insightsHero.eyebrow}</Text>
            <Heading className='h1p' level={1}>
              {insightsHero.headline}
            </Heading>
            <Text className='lead'>{insightsHero.lead}</Text>
            <p className='ixHero__secondary'>{insightsHero.secondary}</p>
          </div>

          <div
            className='ixHero__stage'
            ref={stage}
            onPointerMove={move}
            onPointerLeave={leave}
            aria-hidden='true'
          >
            <div className='ixHero__disc' />
            <div className='ixHero__photo'>
              <Image
                src='/blogs/blog-marketing-spend-banner.webp'
                alt=''
                fill
                priority
                sizes='(max-width: 767px) 92vw, 520px'
              />
            </div>
            <div className='ixHero__note'>What would change the decision?</div>
            <div className='ixHero__slip'>
              <span>Signal</span> Search → recommendation
            </div>
            <div className='ixHero__mark'>“</div>
          </div>
        </header>
      </Container>
    </div>
  );
}
