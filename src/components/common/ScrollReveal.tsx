"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// The scroll reveal's only moving part. Renders nothing.
//
// Read the header of _reveal.scss first — it carries the reasoning for why
// this exists at all, and the standing group-level question about it.
//
// THE ONE RULE THIS COMPONENT IS BUILT AROUND: nothing is hidden that is not
// also, in the same pass, handed to a live observer. The stylesheet hides
// nothing by itself. So no-JS, an old browser, a reduce preference or a thrown
// exception all land on the same outcome — the page exactly as it renders
// today. This codebase has already produced a whole design system that was
// silently unreachable and four separate invisible-text faults; an animation
// is not worth adding a fifth way for content to disappear.
//
// It also never hides anything that is on screen when it runs. An element at
// or above the fold is left alone entirely, so the hero does not fade in on
// load and there is no flash of the page rearranging itself under the reader.

// Elements below this many viewport heights are far enough down that the
// reader cannot have seen them before the effect runs.
const BELOW_FOLD = 1;

// The cascade is capped. A twelve-card grid on a 70ms step would take 840ms to
// finish arriving, which stops reading as a cascade and starts reading as a
// queue. After the cap every remaining child shares the last delay.
const MAX_STEPS = 6;

const isElement = (n: Node): n is HTMLElement => n.nodeType === 1;

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const flow = document.querySelector<HTMLElement>(".page-flow");
    if (!flow) return;

    // Every element this component has touched, so the cleanup can put the DOM
    // back exactly as it found it.
    const touched: HTMLElement[] = [];

    const clear = () => {
      for (const el of touched) {
        el.removeAttribute("data-revealing");
        el.style.removeProperty("--reveal-i");
      }
      touched.length = 0;
    };

    // A page is a list of blocks, but three templates group theirs inside a
    // wrapper — the About close, the article band, the stories page. Those
    // carry data-reveal='group' and their children are the blocks instead.
    // Descent is by explicit attribute rather than by shape: a positional rule
    // in this codebase has already died once under a restructure.
    const blocks: HTMLElement[] = [];
    for (const child of Array.from(flow.children).filter(isElement)) {
      const role = child.getAttribute("data-reveal");
      if (role === "off") continue;
      if (role === "group") {
        for (const inner of Array.from(child.children).filter(isElement)) {
          if (inner.getAttribute("data-reveal") !== "off") blocks.push(inner);
        }
        continue;
      }
      blocks.push(child);
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute("data-revealing", "shown");
          observer.unobserve(el);
        }
      },
      // A little into the viewport rather than the instant an edge crosses it,
      // so the fade reads as a response to the scroll rather than a race with
      // it. The default root is the viewport; container_main's overflow:hidden
      // does not scroll and so is not a scrollport here.
      { threshold: 0.04, rootMargin: "0px 0px -8% 0px" }
    );

    const hide = (el: HTMLElement) => {
      el.setAttribute("data-revealing", "hidden");
      touched.push(el);
      observer.observe(el);
    };

    try {
      const fold = window.innerHeight * BELOW_FOLD;

      for (const block of blocks) {
        // Zero-height blocks are the schema <script> tags the service,
        // industry, article and story templates render as siblings of their
        // sections. Nothing to fade, and hiding one would be a no-op that
        // still costs an observer entry.
        const box = block.getBoundingClientRect();
        if (box.height === 0) continue;
        if (box.top < fold) continue;

        hide(block);

        // Grids cascade. The container is authored, the indices are not: an
        // author cannot know how many cards the data will produce.
        for (const grid of Array.from(
          block.querySelectorAll<HTMLElement>("[data-reveal='stagger']")
        )) {
          const items = Array.from(grid.children).filter(isElement);
          if (items.length < 2) continue;
          items.forEach((item, i) => {
            // Indices start at 1 so the first card follows the block it sits
            // in rather than arriving with it.
            item.style.setProperty(
              "--reveal-i",
              String(Math.min(i + 1, MAX_STEPS))
            );
            hide(item);
          });
        }
      }
    } catch {
      // Something in the walk threw. Whatever has been hidden so far is put
      // back immediately — a half-applied pass is the one outcome that could
      // leave content unreachable, and it is not worth risking for a fade.
      observer.disconnect();
      clear();
      return;
    }

    return () => {
      observer.disconnect();
      clear();
    };
  }, [pathname]);

  return null;
}
