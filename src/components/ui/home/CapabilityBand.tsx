"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties
} from "react";
import {
  CAPABILITY_MEDIA,
  type CapabilityStage
} from "@/data/services/capabilityStage";
import { useInView, useMotionAllowed } from "@/lib/useInView";

// One alternating capability row on the homepage. Server-safe resting pose;
// slides in once when it enters the viewport. Video plays only while in view
// and motion is allowed — otherwise the supplied poster stays.

export default function CapabilityBand({
  title,
  description,
  href,
  ctaLabel,
  stage,
  imageOnLeft
}: {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  stage: CapabilityStage;
  imageOnLeft: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useInView(rootRef, "0px 0px -12% 0px");
  const motion = useMotionAllowed();
  // Content stays visible until JS opts into motion (same rule as ScrollReveal).
  const [motionReady, setMotionReady] = useState(false);
  const [entered, setEntered] = useState(true);
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    if (!motion) {
      setMotionReady(false);
      setEntered(true);
      return;
    }
    const el = rootRef.current;
    const onScreen =
      !!el &&
      el.getBoundingClientRect().top < window.innerHeight * 0.88 &&
      el.getBoundingClientRect().bottom > 0;
    setEntered(onScreen);
    setMotionReady(true);
  }, [motion]);

  useEffect(() => {
    if (visible && motionReady) setEntered(true);
  }, [visible, motionReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stage.video) return;

    if (visible && motion && entered) {
      const play = video.play();
      if (play) play.catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    }
  }, [visible, motion, entered, stage.video]);

  const media = `${CAPABILITY_MEDIA}/${stage.slug}`;
  const titleId = `capability-band-${stage.index}`;

  return (
    <article
      ref={rootRef}
      className={`capabilityBand${imageOnLeft ? "" : " capabilityBand--flip"}`}
      data-motion={motionReady ? "ready" : "off"}
      data-entered={entered ? "true" : "false"}
      data-reveal='off'
      aria-labelledby={titleId}
    >
      <div className='capabilityBand__media'>
        <div
          className='capabilityBand__frame'
          style={
            {
              "--focus-x": stage.focus.x,
              "--focus-y": stage.focus.y
            } as CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='capabilityBand__still'
            src={`${media}.png`}
            alt={stage.alt}
            width={1344}
            height={752}
            loading='lazy'
            decoding='async'
          />
          {stage.video && (
            <video
              ref={videoRef}
              className='capabilityBand__video'
              data-playing={playing ? "true" : "false"}
              muted
              loop
              playsInline
              poster={`${media}.png`}
              preload={entered && motion ? "metadata" : "none"}
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              aria-hidden='true'
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={`${media}.webm`} type='video/webm' />
              <source src={`${media}.mp4`} type='video/mp4' />
            </video>
          )}
        </div>
      </div>

      <div className='capabilityBand__copy'>
        <p className='capabilityBand__index' aria-hidden='true'>
          {stage.index}
        </p>
        <h3 className='capabilityBand__title' id={titleId}>
          {title}
        </h3>
        <p className='capabilityBand__body'>{description}</p>
        <Link href={href} className='textLink textLink--brand'>
          {ctaLabel}
          <span aria-hidden='true'> →</span>
        </Link>
      </div>
    </article>
  );
}
