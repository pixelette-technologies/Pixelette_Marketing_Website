"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionAllowed } from "@/lib/useInView";

// 04 — THE DUCK POND. Locked implementation specification, 28 Sep 2026.
//
// Attention is being visible; relevance is being distinctive for the right
// reason. Many yellow ducks, ONE pink duck in sunglasses, and beside it the
// handwritten "Quacking good at standing out" (29 Sep: no arrow).
//
// A LOOPING VIDEO, 29 Sep. The vector drawing of the reference photograph
// could not reach its realism, so the pond is now a photographic plate
// (Higgsfield, GPT Image 2.5, from the reference) animated into a 4.6s loop
// (Kling 3.0 Pro, locked camera: the ducks bob, rings spread round the pink
// duck, light moves on the water). The last half-second is crossfaded into
// the first, so the loop has no seam. Silent; no audio track at all.
//
// THE NOTE STAYS IN THE PAGE, not in the video, so it is crisp at every size
// and its words can change without a re-render. To keep it on the pink duck
// the video sits in a FRAME that crops like object-fit: cover but is a real
// box (_relevanceSection.scss), and the note is placed in that
// frame's coordinates, which are the video's own.
//
// Like every moving picture on the page it plays only while on screen with
// the tab visible, and never under prefers-reduced-motion: then, as on the
// server and without JavaScript, it is the poster, which is the loop's first
// frame. preload="none", so nothing is fetched until it is near.
//
// The pond is aria-hidden: the picture carries no meaning the headline does
// not state.

const MEDIA = "/home/relevance";

export default function DuckPond({
  annotation
}: {
  annotation: readonly string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useInView(rootRef);
  // As with the Post-its, the note waits until the section is properly in
  // view, not merely near it.
  const arrived = useInView(rootRef, "0px 0px -30% 0px");
  const motion = useMotionAllowed();
  const played = useRef(false);

  // --- The entry, once: the note is written in after the pond is seen. -------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motion || played.current) return;
    if (!arrived) {
      root.dataset.pond = "armed";
      return;
    }
    played.current = true;
    root.dataset.pond = "on";

    const note = root
      .querySelector(".duckPond__note")
      ?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 600,
        delay: 700,
        easing: "ease-out",
        fill: "backwards"
      });
    return () => note?.finish();
  }, [motion, arrived]);

  // --- Playback: on screen and motion allowed, or not at all. ----------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (motion && visible) {
      // React sets `muted` as a property; make sure of it before play(), or
      // the browser's autoplay policy refuses.
      video.muted = true;
      video.play().catch(() => {
        // Refused (data saver, low-power mode): the poster stays, which is
        // the same picture standing still.
      });
    } else {
      video.pause();
    }
  }, [motion, visible]);

  return (
    <div className='duckPond' ref={rootRef} aria-hidden='true'>
      <div className='duckPond__frame'>
        <video
          ref={videoRef}
          className='duckPond__video'
          poster={`${MEDIA}/duck-pond-poster.webp`}
          muted
          loop
          playsInline
          preload='none'
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        >
          <source
            media='(max-width: 767px)'
            src={`${MEDIA}/duck-pond-960.webm`}
            type='video/webm'
          />
          <source
            media='(max-width: 767px)'
            src={`${MEDIA}/duck-pond-960.mp4`}
            type='video/mp4'
          />
          <source src={`${MEDIA}/duck-pond.webm`} type='video/webm' />
          <source src={`${MEDIA}/duck-pond.mp4`} type='video/mp4' />
        </video>

        <div className='duckPond__note'>
          <p className='duckPond__noteText'>
            {annotation.map(line => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
