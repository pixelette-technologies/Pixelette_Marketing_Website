import React from "react";

/**
 * GrowthOperatingSystem
 * ---------------------------------------------------------------------------
 * The signature brand device for the Pixelette Marketing visual redesign.
 * A bespoke, dimensional "operating surface": layered frosted-glass lanes
 * (Strategy -> Demand -> Proof -> Compound) connected by routed crimson signal
 * paths that draw in, terminating in a crosshair endpoint. Framed as an
 * instrument with HUD brackets, a depth ghost layer, an axis and measurement
 * ticks so it reads as proprietary machinery, not a chart.
 *
 * Inline SVG: fully scalable, crisp, themeable, animatable, no image assets.
 * Claims-safe by construction: every label is a capability category. No
 * metrics, numbers, client names, logos or testimonials anywhere.
 */

type Lane = { id: string; label: string; x: number; y: number };

const LANES: Lane[] = [
  { id: "01", label: "STRATEGY", x: 40, y: 420 },
  { id: "02", label: "DEMAND", x: 130, y: 315 },
  { id: "03", label: "PROOF", x: 230, y: 210 },
  { id: "04", label: "COMPOUND", x: 330, y: 100 }
];

const PANEL_W = 300;
const PANEL_H = 90;

const node = (l: Lane) => ({ x: l.x + PANEL_W, y: l.y + PANEL_H / 2 });
const N = LANES.map(node);

const SIGNAL_PATH = [
  `M ${N[0].x} ${N[0].y}`,
  `C ${N[0].x + 52} ${N[0].y} ${N[1].x - 42} ${N[1].y} ${N[1].x} ${N[1].y}`,
  `C ${N[1].x + 52} ${N[1].y} ${N[2].x - 42} ${N[2].y} ${N[2].x} ${N[2].y}`,
  `C ${N[2].x + 52} ${N[2].y} ${N[3].x - 46} ${N[3].y} ${N[3].x} ${N[3].y}`
].join(" ");

function Lanes({ ghost = false }: { ghost?: boolean }) {
  const dx = ghost ? -16 : 0;
  const dy = ghost ? -12 : 0;
  return (
    <g
      opacity={ghost ? 0.22 : 1}
      filter={ghost ? "url(#gosBlur)" : undefined}
      transform={`translate(${dx} ${dy})`}
    >
      {LANES.map((l, i) => {
        const isFront = i === LANES.length - 1;
        return (
          <g key={l.id}>
            <rect
              x={l.x}
              y={l.y}
              width={PANEL_W}
              height={PANEL_H}
              rx='14'
              fill='url(#gosGlass)'
              stroke='rgba(165,121,106,0.55)'
              strokeWidth='1'
            />
            <line
              x1={l.x + 14}
              y1={l.y + 1.5}
              x2={l.x + PANEL_W - 14}
              y2={l.y + 1.5}
              stroke='rgba(255,250,247,0.30)'
              strokeWidth='1'
            />
            {isFront && !ghost && (
              <line
                x1={l.x + 1}
                y1={l.y + 14}
                x2={l.x + 1}
                y2={l.y + PANEL_H - 14}
                stroke='#D8123F'
                strokeWidth='2'
                opacity='0.8'
              />
            )}
            {!ghost && (
              <>
                <text
                  x={l.x + 22}
                  y={l.y + 32}
                  fill='#D8123F'
                  fontSize='15'
                  fontStyle='italic'
                  fontWeight='700'
                >
                  {l.id}
                </text>
                <text
                  x={l.x + 50}
                  y={l.y + 32}
                  fill='rgba(203,179,166,0.94)'
                  fontSize='12'
                  letterSpacing='2.6'
                >
                  {l.label}
                </text>
                {Array.from({ length: 10 }).map((_, k) => (
                  <line
                    key={k}
                    x1={l.x + 22 + k * 13}
                    y1={l.y + PANEL_H - 16}
                    x2={l.x + 22 + k * 13}
                    y2={l.y + PANEL_H - 16 - (k % 2 === 0 ? 8 : 4)}
                    stroke='rgba(203,179,166,0.5)'
                    strokeWidth='1.3'
                  />
                ))}
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function GrowthOperatingSystem({
  className = ""
}: {
  className?: string;
}) {
  const end = N[N.length - 1];
  const bracket = (x: number, y: number, sx: number, sy: number) => (
    <path
      d={`M ${x + sx * 18} ${y} L ${x} ${y} L ${x} ${y + sy * 18}`}
      fill='none'
      stroke='rgba(203,179,166,0.5)'
      strokeWidth='1.4'
    />
  );

  return (
    <div className={`gos ${className}`} aria-hidden='true'>
      <svg
        className='gos__svg'
        viewBox='0 0 680 580'
        width='100%'
        height='auto'
        preserveAspectRatio='xMidYMid meet'
        role='presentation'
      >
        <defs>
          <radialGradient id='gosAmbient' cx='60%' cy='42%' r='62%'>
            <stop offset='0%' stopColor='rgba(179,6,60,0.34)' />
            <stop offset='55%' stopColor='rgba(179,6,60,0.05)' />
            <stop offset='100%' stopColor='rgba(179,6,60,0)' />
          </radialGradient>
          <linearGradient id='gosGlass' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='rgba(248,245,243,0.15)' />
            <stop offset='100%' stopColor='rgba(248,245,243,0.03)' />
          </linearGradient>
          <linearGradient id='gosSignal' x1='0' y1='1' x2='1' y2='0'>
            <stop offset='0%' stopColor='#B3063C' />
            <stop offset='100%' stopColor='#D8123F' />
          </linearGradient>
          <filter id='gosBloom' x='-60%' y='-60%' width='220%' height='220%'>
            <feGaussianBlur stdDeviation='7' />
          </filter>
          <filter id='gosBloomWide' x='-80%' y='-80%' width='260%' height='260%'>
            <feGaussianBlur stdDeviation='17' />
          </filter>
          <filter id='gosBlur' x='-30%' y='-30%' width='160%' height='160%'>
            <feGaussianBlur stdDeviation='3' />
          </filter>
        </defs>

        <rect x='0' y='0' width='680' height='580' fill='url(#gosAmbient)' />
        <ellipse
          cx='380'
          cy='340'
          rx='260'
          ry='130'
          fill='rgba(179,6,60,0.16)'
          filter='url(#gosBloomWide)'
        />

        {/* HUD frame */}
        {bracket(20, 20, 1, 1)}
        {bracket(660, 20, -1, 1)}
        {bracket(20, 560, 1, -1)}
        {bracket(660, 560, -1, -1)}

        {/* left axis ticks */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={i}
            x1='30'
            y1={120 + i * 28}
            x2={30 + (i % 4 === 0 ? 12 : 6)}
            y2={120 + i * 28}
            stroke='rgba(165,121,106,0.45)'
            strokeWidth='1'
          />
        ))}

        {/* depth ghost, then live lanes */}
        <Lanes ghost />
        <Lanes />

        {/* signal: wide bloom + crisp animated draw-in */}
        <path
          d={SIGNAL_PATH}
          fill='none'
          stroke='url(#gosSignal)'
          strokeWidth='6'
          opacity='0.5'
          filter='url(#gosBloomWide)'
        />
        <path
          className='gos__signal'
          d={SIGNAL_PATH}
          fill='none'
          stroke='url(#gosSignal)'
          strokeWidth='2.4'
          strokeLinecap='round'
        />

        {/* nodes */}
        {N.map((p, i) => {
          const isEnd = i === N.length - 1;
          return (
            <g key={i} className={`gos__node ${isEnd ? "gos__node--end" : ""}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isEnd ? 17 : 9}
                fill='rgba(179,6,60,0.6)'
                filter='url(#gosBloom)'
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={isEnd ? 12 : 8}
                fill='none'
                stroke='#D8123F'
                strokeWidth='2'
              />
              <circle cx={p.x} cy={p.y} r={isEnd ? 4 : 2.6} fill='#FFD2DC' />
            </g>
          );
        })}

        {/* crosshair endpoint */}
        <g stroke='#D8123F' fill='none'>
          <circle cx={end.x} cy={end.y} r='27' opacity='0.5' strokeWidth='1' />
          <circle cx={end.x} cy={end.y} r='42' opacity='0.26' strokeWidth='1' />
          <line x1={end.x} y1={end.y - 31} x2={end.x} y2={end.y - 48} strokeWidth='1' opacity='0.7' />
          <line x1={end.x} y1={end.y + 31} x2={end.x} y2={end.y + 48} strokeWidth='1' opacity='0.7' />
          <line x1={end.x - 31} y1={end.y} x2={end.x - 48} y2={end.y} strokeWidth='1' opacity='0.7' />
          <line x1={end.x + 31} y1={end.y} x2={end.x + 48} y2={end.y} strokeWidth='1' opacity='0.7' />
        </g>
      </svg>
    </div>
  );
}
