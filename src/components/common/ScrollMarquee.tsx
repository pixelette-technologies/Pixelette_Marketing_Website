"use client";

import { useEffect, useRef } from "react";

// The scroll-driven strip. THE FOURTH MOTION SURFACE, and the second marquee.
//
// Read the header of _scrollMarquee.scss and the motion inventory at the top
// of _surfaces.scss before touching this. Trap 10: a motion surface that is
// not registered where the rule is stated gets read as leftover decoration and
// deleted by the next pass. _marquee.scss already lost its keyframes that way
// once.
//
// WHAT IT IS. A row of words wider than the viewport, whose horizontal offset
// is a function of how far the page has been scrolled. Not a timed loop — the
// logo marquee is that, and it moves whether anyone is there or not. This one
// only moves when the reader does, which is the whole point: the words track
// the scroll rather than competing with it.
//
// THE ONE RULE IT IS BUILT AROUND, taken verbatim from ScrollReveal: nothing
// is hidden that is not also, in the same pass, handed to a live driver. The
// stylesheet on its own lays the words out as a wrapped, static, fully legible
// row — every word on screen, no clipping, no duplicates. The moving strip is
// switched on by `data-marquee="on"`, which only this file ever sets, and only
// after it has measured that the geometry actually works. No JS, no rAF, an
// old browser, a reduce preference or a thrown exception all land on the
// readable row. Four product claims are not worth a fifth way for content to
// disappear on this site.
//
// It follows that there IS a layout change on hydration, from wrapped row to
// strip. It is not a flash of unstyled content — both states are finished
// states — and the section sits well below the fold on every viewport, so the
// swap has happened long before it is scrolled to. Said plainly because the
// alternative, shipping the strip in the HTML, means shipping a clipped row to
// anyone whose JS never arrives.

// How far the strip travels per pixel of page scroll. A full viewport of
// scrolling moves it about a third of a viewport, which reads as drift rather
// than as a conveyor belt. The only tuning knob this component has.
const SPEED = 0.35;

// Per-frame approach to the scroll's own position. Lower is looser. This is
// what makes it SMOOTH rather than welded to the scrollbar: the strip catches
// up over a few frames instead of stepping with every wheel notch.
const EASE = 0.12;

// Converged. Below this the loop stops rather than burning frames on
// sub-pixel motion; the scroll listener starts it again.
const SETTLED = 0.05;

// How many copies of the word group the markup carries. The strip wraps by
// translating within one group width, so the rendered track has to cover
// `group + viewport` for the wrap to stay off screen. Three copies leaves two
// spare group widths, and one group is four multi-word phrases at display
// size — comfortably wider than any viewport this site is read on. The
// component MEASURES that rather than trusting it, and stays on the static row
// if it does not hold.
const REPEATS = 3;

export interface ScrollMarqueeProps {
  items: string[];
  /** Names the strip for assistive technology; the duplicates are hidden. */
  label?: string;
}

export default function ScrollMarquee({ items, label }: ScrollMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;
    if (!("requestAnimationFrame" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const group = track.firstElementChild as HTMLElement | null;
    if (!group) return;

    let groupWidth = 0;
    let frame = 0;
    let running = false;
    let visible = false;

    // Where the page was when the strip last came into view. The offset is
    // measured from there, so the first word starts flush at the left edge
    // rather than at whatever arbitrary phase `scrollY % groupWidth` happened
    // to be — which is what a reader landing on a deep link would otherwise
    // get.
    let origin = 0;
    let target = 0;
    let current = 0;

    // The geometry the wrap depends on. Re-read on resize, because the word
    // sizes are clamps and the group is a different width at every viewport.
    const measure = () => {
      groupWidth = group.getBoundingClientRect().width;
      return groupWidth > 0 && groupWidth * (REPEATS - 1) >= root.clientWidth;
    };

    const draw = () => {
      // Modulo keeps the transform inside one group width forever, so the
      // number handed to the compositor stays small no matter how far the page
      // has been scrolled. Without it this grows without bound and the strip
      // eventually lands in float-precision mush.
      //
      // FOLDED TWICE, and it has to be. JS `%` keeps the sign of its left
      // operand, and `current` goes negative the moment the reader scrolls UP
      // — which they do every time they re-enter this section from below. A
      // raw `current % groupWidth` is then negative, the track translates
      // RIGHT, and the strip pulls away from the left edge leaving a band of
      // empty page beside it. The second fold puts the result back in
      // [0, groupWidth) so the translate is never positive and the track
      // always covers from the left edge rightwards.
      const x =
        groupWidth > 0 ? ((current % groupWidth) + groupWidth) % groupWidth : 0;
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    const tick = () => {
      const delta = target - current;
      current += delta * EASE;
      draw();
      if (Math.abs(delta) < SETTLED) {
        current = target;
        draw();
        running = false;
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!visible) return;
      target = (window.scrollY - origin) * SPEED;
      start();
    };

    // Engaged only while the section is near the viewport. A strip nobody can
    // see has no business holding a rAF loop open, and the site already runs
    // ScrollReveal's observer and the hero's pointer parallax alongside it.
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (!visible) continue;
          // Re-anchor on every entry. The reader may have scrolled past and
          // come back, and catching up across that gap would show the strip
          // sprinting sideways the moment it appeared.
          origin = window.scrollY;
          target = 0;
          current = 0;
          draw();
          start();
        }
      },
      // Early enough that the first frames are spent off screen.
      { rootMargin: "25% 0px 25% 0px" }
    );

    let resizeObserver: ResizeObserver | undefined;

    const disengage = () => {
      root.removeAttribute("data-marquee");
      track.style.removeProperty("transform");
    };

    try {
      if (!measure()) return;

      // The switch from the static row to the strip. Only this line ever sets
      // it, and only after the measure above has proved the geometry.
      root.setAttribute("data-marquee", "on");

      // Turning it on changes the layout, so the width taken a moment ago was
      // the wrapped row's. Take it again, on the strip itself.
      if (!measure()) {
        disengage();
        return;
      }

      draw();
      observer.observe(root);
      window.addEventListener("scroll", onScroll, { passive: true });

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(() => {
          if (measure()) {
            draw();
            return;
          }
          // The viewport grew past what three copies can cover. Back to the
          // readable row rather than on to a visible seam.
          disengage();
        });
        resizeObserver.observe(root);
      }
    } catch {
      // Same posture as ScrollReveal: a half-applied pass is the one outcome
      // that could leave words unreachable, so anything thrown puts the DOM
      // back the way the stylesheet left it.
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      disengage();
      return;
    }

    return () => {
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      disengage();
    };
  }, [items]);

  // The group is emitted REPEATS times and every copy after the first is
  // aria-hidden, so the accessibility tree sees four phrases rather than
  // twelve. Motion and duplication are ONE THING here, exactly as they are in
  // _marquee.scss: the stylesheet hides copies 2 and 3 until `data-marquee` is
  // on, and if the strip is ever removed the duplicates go with it.
  const group = (copy: number) => (
    <div
      className='scrollMarquee__group'
      key={copy}
      aria-hidden={copy > 0 || undefined}
    >
      {items.map((item, index) => (
        <span className='scrollMarquee__item' key={index}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className='scrollMarquee' ref={rootRef} aria-label={label}>
      <div className='scrollMarquee__track' ref={trackRef}>
        {Array.from({ length: REPEATS }, (_, copy) => group(copy))}
      </div>
    </div>
  );
}
