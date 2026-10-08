"use client";

import { useEffect, useRef, useState } from "react";

// The How we're built flow: four stages on one thin line, and a pink signal
// that runs through them ONCE when the section comes into view. 30 Sep 2026.
//
// THE FINISHED FLOW IS THE SERVER'S HTML. Nothing is set back to its start
// that is not also, in the same pass, handed to a live observer — the
// ScrollReveal rule. So no JavaScript, reduced motion, a missing
// IntersectionObserver, or a section already on screen when the page loads all
// show the finished flow and nothing moves.
//
// ONE RUN, 700ms, THEN NEVER AGAIN. The observer disconnects on the first
// intersection and the state goes to "done", which the stylesheet treats as
// the finished flow. There is no loop and nothing replays on scroll back.
//
// The motion carries no meaning: the stages are an ordered list, numbered in
// text, and the line, nodes and signal are aria-hidden decoration.

/** Keep in step with $built-run in _builtFlow.scss. */
const RUN_MS = 700;

type State = "idle" | "armed" | "run" | "done";

export default function BuiltFlow({ stages }: { stages: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const node = root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already seen, or partly seen: leave it finished rather than rewind it
    // under the reader's eyes.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    let timer = 0;
    setState("armed");

    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        setState("run");
        timer = window.setTimeout(() => setState("done"), RUN_MS + 250);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className='builtFlow' ref={root} data-state={state}>
      {/* A sibling of the list, not an item in it, so the list is exactly the
          four stages. .builtFlow is the list's own box, so the track's
          percentages are the list's. */}
      <div className='builtFlow__track' aria-hidden='true'>
        <span className='builtFlow__fill' />
        <span className='builtFlow__signal' />
      </div>
      <ol className='builtFlow__stages'>
        {stages.map((stage, i) => (
          <li
            key={stage}
            className='builtFlow__stage'
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className='builtFlow__node' aria-hidden='true' />
            <span className='builtFlow__index'>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className='builtFlow__title'>{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
