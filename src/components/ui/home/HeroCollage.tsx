"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// The hero collage, and the only interactive element on the home page.
//
// Phase F. The user asked for the parallax back. D2 removed it as decoration
// under the flat-and-static register, and that is a settled Phase A decision
// being deliberately reversed — the hero is the user's call by eye, per the
// decision-rights table in the vault.
//
// WHAT WAS THERE BEFORE DID NOT ACTUALLY PARALLAX. All five images shared the
// same offset and differed only in transition duration (0.1s, 0.5s, 0.4s, 0.5s,
// 0.5s), so there was no per-layer depth at all — the sense of depth was an
// artefact of staggered easing, at an amplitude of 10px. This version gives
// each layer a real depth multiplier, set in SCSS next to the positioning it
// belongs with, so the near images travel further than the far ones. That is
// what makes it read as depth rather than as a wobble.
//
// It lives in its own client component so HomeHero stays a SERVER component.
// The hero is above the fold and its images are `priority`; there is no reason
// for the headline, the standfirst and the call to action to ship as client
// JavaScript because the picture beside them moves.
//
// This component writes two custom properties and nothing else. Every transform
// is in _heroHome.scss, so the depth values sit beside the percentages that
// place each image and cannot drift away from them.

const HeroCollage = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Two reasons to never start: the visitor asked their system for less
    // motion, or there is no fine pointer to track. A touch device would pay
    // for the listener and never move a pixel.
    const allowed = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)"
    );
    if (!allowed.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      // Coalesced into an animation frame. Pointer events fire far faster than
      // the screen refreshes, and writing a custom property on every one of
      // them is how this kind of effect ends up janky.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = el.getBoundingClientRect();
        if (!box.width || !box.height) return;

        // -1 to 1 across the box, so the SCSS can scale it per layer. Unitless
        // on purpose: the depth values carry the pixels.
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;

        el.style.setProperty("--px", (x * 2).toFixed(3));
        el.style.setProperty("--py", (y * 2).toFixed(3));
      });
    };

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };

    // On the window rather than the collage, so the layers track the pointer as
    // it approaches instead of snapping when it crosses the image edge.
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Markup and source order are exactly as they were. The images, their sizes,
  // their order and their alt text are untouched; only the wrapper gained a ref
  // and a class.
  return (
    <section ref={ref} className='heroCollage'>
      {/* Men Picture */}
      <Image src='/home/hh_image_1.webp' alt='' width={402} priority height={408} />
      {/* Building Image */}
      <Image src='/home/hh_image_2.webp' alt='' width={342} priority height={362} />
      {/* Back ground round */}
      <Image src='/home/hh_image_3.webp' alt='' width={353} priority height={354} />
      {/* Laptop */}
      <Image src='/home/hh_image_4.webp' alt='' width={199} priority height={218} />
      {/* Clock tower */}
      <Image src='/home/hh_image_6.webp' alt='' width={162} priority height={628} />
    </section>
  );
};

export default HeroCollage;
