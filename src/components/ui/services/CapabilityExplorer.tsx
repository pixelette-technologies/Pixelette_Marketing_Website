"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent
} from "react";
import type { CapabilityGroup } from "@/data/services/capabilityGroups";
import {
  CAPABILITY_MEDIA,
  capabilityStages
} from "@/data/services/capabilityStage";
import { useFinePointer, useInView, useMotionAllowed } from "@/lib/useInView";

// /services: the five capabilities as ONE explorer. 29 Sep 2026, the "What We
// Do" implementation instruction.
//
// It replaces the stacked list of five that sat here since 22 Sep. The
// taxonomy, the copy and the links are unchanged and still come from
// capabilityGroups; what is new is the lead statement per capability and the
// artwork (capabilityStage.ts).
//
// TWO COLUMNS, NOT FIVE CARDS. On the left, about 38%, the five names as an
// accordion: all five always visible, the open one showing its statement,
// copy, services and links. On the right, about 62% and bleeding to the
// viewport's right edge, ONE stage. The selected capability changes the
// artwork on that stage; it is never a gallery of five pictures.
//
// THE INTERACTION. 01 is open on load. Click, tap, Enter or Space opens a
// capability and it stays open. A mouse resting on another row PREVIEWS its
// artwork on the stage after a short intent delay, and the stage returns to
// the open capability when the pointer leaves the list, so sweeping across
// the names does not strobe the stage. Arrow keys, Home and End move focus
// between the five, the accordion pattern's optional keys. There is always
// exactly one open: activating the open one leaves it open.
//
// ON A PHONE the stage sits directly under the open capability's copy. It is
// the same element, moved by CSS grid rows rather than duplicated, so there is
// still only ever one stage and one set of media.
//
// MOTION. Only the capability on the stage moves. On a change the previous
// loop is paused and reset to its start, the stage crossfades, and the next
// loop plays from currentTime 0. Nothing plays off screen, in a hidden tab or
// under prefers-reduced-motion — then the stage is the poster PNG, which is
// also the server and no-JavaScript render.
//
// LOADING (30 Sep 2026, final media instruction). The shown capability's loop
// loads in full (Strategy on arrival). The other four stay preload="none"
// until the visitor comes near them — a mouse entering the row, keyboard
// focus, or a touch starting on it — and then only their metadata is
// prefetched, so the loop starts promptly without five full videos loading at
// once. All five posters are fetched up front, Strategy's first. Each <video>
// offers WebM first and MP4 second and carries its PNG as its poster.
//
// A fine pointer adds a slow parallax on the stage, easing towards the
// pointer rather than following it. (The Search beam wash that leaned with
// the pointer went on 30 Sep: the supplied loop sweeps its own beam both
// ways, and a fixed wash over it would contradict the footage.)

/** How long a mouse rests on a row before its artwork previews. */
const PREVIEW_DELAY = 160;

export default function CapabilityExplorer({
  groups
}: {
  groups: readonly CapabilityGroup[];
}) {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const shown = preview ?? selected;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const previewTimer = useRef<number | undefined>(undefined);
  const lastShown = useRef<number | null>(null);

  const visible = useInView(stageRef, "10% 0px 10% 0px");
  const motion = useMotionAllowed();
  const fine = useFinePointer();

  const [playing, setPlaying] = useState<number | null>(null);
  // Capabilities the visitor has come near: their loops may prefetch
  // metadata. Strategy is shown first, so it is loaded regardless.
  const [warm, setWarm] = useState<ReadonlySet<number>>(() => new Set([0]));
  const warmUp = (index: number) =>
    setWarm(current =>
      current.has(index) ? current : new Set(current).add(index)
    );

  // --- Selection -------------------------------------------------------------
  const open = (index: number) => {
    window.clearTimeout(previewTimer.current);
    setSelected(index);
    setPreview(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = groups.length;
    const moves: Record<string, number> = {
      ArrowDown: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      Home: 0,
      End: count - 1
    };
    if (event.key in moves) {
      event.preventDefault();
      buttons.current[moves[event.key]]?.focus();
    }
  };

  const onRowPointerEnter = (event: PointerEvent, index: number) => {
    // Near-interaction: whatever the pointer, start fetching its metadata.
    warmUp(index);
    // Preview is mouse only: on touch, pointerenter arrives with the tap.
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(previewTimer.current);
    previewTimer.current = window.setTimeout(
      () => setPreview(index === selected ? null : index),
      PREVIEW_DELAY
    );
  };

  const endPreview = () => {
    window.clearTimeout(previewTimer.current);
    setPreview(null);
  };

  useEffect(() => () => window.clearTimeout(previewTimer.current), []);

  // --- Playback: the shown capability's loop, and nothing else ---------------
  useEffect(() => {
    const previous = lastShown.current;
    const arrived = previous !== shown;
    lastShown.current = shown;

    // 1–2. The capability that just left: paused, and back to its start, so
    // it never runs on unseen and always returns from its first frame.
    if (arrived && previous !== null) {
      const left = videos.current[previous];
      if (left) {
        left.pause();
        if (left.currentTime > 0) left.currentTime = 0;
      }
    }

    // 3 is the stage's CSS crossfade. 4–5 below.
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === shown && motion && visible) {
        // A capability arriving starts from its intended first frame; one
        // that was only paused by scrolling away carries on where it was.
        if (arrived && video.currentTime > 0) video.currentTime = 0;
        // React sets `muted` as a property; make sure of it before play(), or
        // the autoplay policy refuses.
        video.muted = true;
        video.play().catch(() => {
          // Refused (data saver, low-power mode): the still stays, which is
          // the same picture standing still.
        });
      } else if (!video.paused) {
        video.pause();
      }
    });

  }, [shown, motion, visible]);

  // --- Pointer: parallax ------------------------------------------------------
  // Written to CSS variables on the stage from one eased loop, so React does
  // not re-render per frame. Off entirely without a fine pointer or motion.
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || !motion || !fine || !visible) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      // Slow ease: the stage leans towards the pointer, it never chases it.
      x += (targetX - x) * 0.045;
      y += (targetY - y) * 0.045;
      stage.style.setProperty("--pointer-x", x.toFixed(4));
      stage.style.setProperty("--pointer-y", y.toFixed(4));
      frame =
        Math.abs(targetX - x) + Math.abs(targetY - y) > 0.0005
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = stage.getBoundingClientRect();
      targetX = Math.max(
        -1,
        Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1)
      );
      targetY = Math.max(
        -1,
        Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1)
      );
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      stage.style.removeProperty("--pointer-x");
      stage.style.removeProperty("--pointer-y");
    };
  }, [motion, fine, visible]);

  return (
    <div
      className='capExplorer'
      ref={rootRef}
      data-motion={motion ? "on" : "off"}
    >
      <div className='capExplorer__rail' onPointerLeave={endPreview}>
        {groups.map((group, index) => {
          const stage = capabilityStages.find(s => s.index === group.index);
          const isOpen = index === selected;
          // On a phone the stage takes the row straight after the open
          // capability; the rows after it move down one.
          const row = index <= selected ? index + 1 : index + 2;
          const buttonId = `capability-${group.index}`;
          const panelId = `capability-${group.index}-panel`;

          return (
            <div
              key={group.index}
              className='capItem'
              data-open={isOpen}
              data-preview={preview === index}
              style={{ "--row": row } as CSSProperties}
            >
              <h2 className='capItem__heading'>
                <button
                  ref={node => {
                    buttons.current[index] = node;
                  }}
                  type='button'
                  id={buttonId}
                  className='capItem__trigger'
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => open(index)}
                  onKeyDown={event => onKeyDown(event, index)}
                  onPointerEnter={event => onRowPointerEnter(event, index)}
                  onPointerDown={() => warmUp(index)}
                  onFocus={() => warmUp(index)}
                >
                  <span className='capItem__index'>{group.index}</span>
                  <span className='capItem__name'>{group.title}</span>
                  {/* The open state is carried by shape as well as colour: a
                      leading rule and this mark, which turns from a plus to a
                      minus. */}
                  <span className='capItem__mark' aria-hidden='true' />
                </button>
              </h2>

              <div
                id={panelId}
                role='region'
                aria-labelledby={buttonId}
                className='capItem__panel'
                inert={!isOpen}
              >
                <div className='capItem__panelInner'>
                  {stage && (
                    <p className='capItem__statement'>
                      {stage.statement.map((line, i) => (
                        <span key={line} className='capItem__statementLine'>
                          {i > 0 && " "}
                          {line}
                        </span>
                      ))}
                    </p>
                  )}

                  <p className='capItem__body'>{group.body}</p>

                  {group.scope.length > 0 && (
                    <ul
                      className='capItem__scope'
                      aria-label={`${group.title} services`}
                    >
                      {group.scope.map(entry => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  )}

                  {/* Strategy & Positioning has no service page; its way out
                      is the diagnostic, as before. See capabilityGroups.ts. */}
                  {group.featured && (
                    <Link
                      href={group.featured.route}
                      className='textLink textLink--brand capItem__featured'
                    >
                      {group.featured.label}
                    </Link>
                  )}

                  {group.services.length > 0 && (
                    <ul className='capItem__services'>
                      {group.services.map(service => (
                        <li key={service.route}>
                          <Link
                            href={`/services/${service.route}`}
                            className='textLink textLink--brand'
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className='capStage'
        ref={stageRef}
        style={{ "--row": selected + 2 } as CSSProperties}
      >
        {capabilityStages.map((stage, index) => {
          const isShown = index === shown;
          const media = `${CAPABILITY_MEDIA}/${stage.slug}`;
          return (
            <div
              key={stage.slug}
              className={`capStage__layer capStage__layer--${stage.index}`}
              data-shown={isShown}
              data-playing={isShown && playing === index}
              data-still={!stage.video}
              aria-hidden={!isShown}
              style={
                {
                  "--focus-x": stage.focus.x,
                  "--focus-y": stage.focus.y
                } as CSSProperties
              }
            >
              <div className='capStage__frame'>
                {/* The poster: the supplied PNG, under the loop. It is the
                    stage before the video is ready, the fallback if it never
                    plays, and all of it under reduced motion. All five are
                    fetched up front so a change never waits on an image;
                    Strategy's first and at high priority. A plain <img>, not
                    next/image: the instruction is to serve the supplied files
                    as they are, and next/image would re-encode them. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className='capStage__still'
                  src={`${media}.png`}
                  alt={stage.alt}
                  width={1344}
                  height={752}
                  loading='eager'
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding='async'
                />

                {stage.video && (
                  <video
                    ref={node => {
                      videos.current[index] = node;
                    }}
                    className='capStage__video'
                    muted
                    loop
                    playsInline
                    poster={`${media}.png`}
                    preload={
                      !motion
                        ? "none"
                        : index === shown
                          ? "auto"
                          : warm.has(index)
                            ? "metadata"
                            : "none"
                    }
                    disablePictureInPicture
                    disableRemotePlayback
                    tabIndex={-1}
                    aria-hidden='true'
                    onPlaying={() => setPlaying(index)}
                    onPause={() =>
                      setPlaying(current => (current === index ? null : current))
                    }
                  >
                    <source src={`${media}.webm`} type='video/webm' />
                    <source src={`${media}.mp4`} type='video/mp4' />
                  </video>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
