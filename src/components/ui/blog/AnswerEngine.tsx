"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionAllowed } from "@/lib/useInView";
import { featured } from "@/data/insights/insights";

// The featured article's visual: an answer engine sitting between the buyer
// and the websites. 30 Sep 2026, to the final Insights brief.
//
// VENDOR-NEUTRAL BY CONSTRUCTION. No logo, no product name, no product's
// colours and no product's interface. The answer panel is drawn from the
// site's own tokens, and its only glyph is a plain ring. The brief bars a
// ChatGPT-led visual; this one would read the same whichever assistant the
// buyer uses.
//
// THE SEQUENCE RUNS ONCE, when the visual first comes into view: the buyer's
// question, then the answer 320ms later, then one highlight across the answer
// zone. Nothing loops. The server renders the finished state, so without
// JavaScript or under reduced motion the picture is complete and still.

type Seq = "rest" | "armed" | "play";

export default function AnswerEngine() {
  const { visual } = featured;
  const root = useRef<HTMLDivElement>(null);
  const motion = useMotionAllowed();
  const [seen, setSeen] = useState(false);

  // Latch on first sight, the pattern IndustryExplorer uses: once played, the
  // visual stays finished however often it scrolls in and out.
  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Without an observer there is nothing to wait for, so the visual rests
  // finished rather than armed and invisible.
  const canWait = typeof IntersectionObserver !== "undefined";
  const seq: Seq = !motion || !canWait ? "rest" : seen ? "play" : "armed";

  return (
    <div className='ixAnswer' ref={root} data-seq={seq} aria-hidden='true'>
      <div className='ixAnswer__buyer'>
        <span className='ixAnswer__who'>Buyer</span>
        <p className='ixAnswer__question'>{visual.question}</p>
      </div>

      <div className='ixAnswer__engine'>
        <div className='ixAnswer__head'>
          <span className='ixAnswer__ring' />
          <span>{visual.answerLabel}</span>
          <span className='ixAnswer__note'>{visual.answerNote}</span>
        </div>
        <div className='ixAnswer__lines'>
          <span />
          <span />
          <span />
        </div>
        <ol className='ixAnswer__shortlist'>
          {visual.shortlist.map((state, i) => (
            <li key={i} data-named={state !== "Not named"}>
              <span className='ixAnswer__bar' />
              <span className='ixAnswer__state'>{state}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className='ixAnswer__sources'>
        <span className='ixAnswer__sourcesLabel'>{visual.sourcesLabel}</span>
        <div className='ixAnswer__sites'>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
