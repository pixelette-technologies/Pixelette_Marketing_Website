import { dimensions } from "@/data/strategy";
import type { DimensionScore } from "@/lib/strategyDiagnostic";

// SVG Impact Compass — star-rose on the intro, scored radar on results.
// Six axes match DIMENSIONS order. Built in code (not the mock-up PNG).
// Gap-closure 20 Nov 2026: intro reads as a compass rose, not a radar plot.

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RINGS = [0.34, 0.56, 0.78, 1];
const AXIS_R = 128;
const LABEL_R = 168;
const OUTER_R = 146;
const ROSE_OUTER = 72;
const ROSE_INNER = 22;
const ROSE_MID = 42;

const polar = (index: number, radius: number) => {
  // Start at top, clockwise — matches the approved Option 3 layout.
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / dimensions.length;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle)
  };
};

const polygonPoints = (radii: number[]) =>
  radii
    .map((radius, i) => {
      const { x, y } = polar(i, radius);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

const rosePoints = (inner: number, outer: number, tips: number) => {
  const pts: string[] = [];
  for (let i = 0; i < tips * 2; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / tips;
    const r = i % 2 === 0 ? outer : inner;
    pts.push(
      `${(CX + r * Math.cos(angle)).toFixed(1)},${(CY + r * Math.sin(angle)).toFixed(1)}`
    );
  }
  return pts.join(" ");
};

interface ImpactCompassProps {
  /** When set, plot the visitor's six dimension percentages. */
  scores?: DimensionScore[];
  /** Overall 0–100 shown in the centre (results only). */
  overall?: number;
  overallCaption?: string;
  outOf?: string;
  /** Decorative intro rose vs scored results chart. */
  variant?: "intro" | "results";
  className?: string;
}

const ImpactCompass = ({
  scores,
  overall,
  overallCaption,
  outOf = "100",
  variant = "intro",
  className
}: ImpactCompassProps) => {
  const isResults = variant === "results";
  const uid = isResults ? "icr" : "ici";

  const values = scores
    ? scores.map(
        s => (AXIS_R * Math.min(Math.max(s.percentage, 0), 100)) / 100
      )
    : null;

  return (
    <svg
      className={className ?? "impactCompass"}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role={isResults ? "img" : "presentation"}
      aria-hidden={isResults ? undefined : true}
      aria-label={
        isResults && overall !== undefined
          ? `Clarity compass, overall score ${overall} out of ${outOf}`
          : undefined
      }
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx='50%' cy='45%' r='55%'>
          <stop
            offset='0%'
            stopColor='var(--color-brand-signal)'
            stopOpacity={isResults ? "0.4" : "0.65"}
          />
          <stop
            offset='45%'
            stopColor='var(--color-brand)'
            stopOpacity='0.2'
          />
          <stop offset='100%' stopColor='transparent' stopOpacity='0' />
        </radialGradient>
        <radialGradient id={`${uid}-hub`} cx='50%' cy='50%' r='50%'>
          <stop
            offset='0%'
            stopColor='var(--color-page)'
            stopOpacity='0.95'
          />
          <stop
            offset='35%'
            stopColor='var(--color-brand-signal)'
            stopOpacity='0.85'
          />
          <stop
            offset='100%'
            stopColor='var(--color-brand)'
            stopOpacity='0.15'
          />
        </radialGradient>
        <linearGradient id={`${uid}-petal`} x1='50%' y1='0%' x2='50%' y2='100%'>
          <stop
            offset='0%'
            stopColor='var(--color-page)'
            stopOpacity='0.95'
          />
          <stop
            offset='55%'
            stopColor='var(--color-brand-signal)'
            stopOpacity='0.75'
          />
          <stop
            offset='100%'
            stopColor='var(--color-brand)'
            stopOpacity='0.35'
          />
        </linearGradient>
        <filter id={`${uid}-soft`} x='-40%' y='-40%' width='180%' height='180%'>
          <feGaussianBlur stdDeviation='3.2' result='b' />
          <feMerge>
            <feMergeNode in='b' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <filter id={`${uid}-bloom`} x='-60%' y='-60%' width='220%' height='220%'>
          <feGaussianBlur stdDeviation='6' result='b' />
          <feMerge>
            <feMergeNode in='b' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={OUTER_R + 40} fill={`url(#${uid}-glow)`} />

      <circle
        className='impactCompass__outer'
        cx={CX}
        cy={CY}
        r={OUTER_R}
        fill='none'
      />

      {RINGS.map(scale => (
        <circle
          key={scale}
          className='impactCompass__ring'
          cx={CX}
          cy={CY}
          r={AXIS_R * scale}
          fill='none'
        />
      ))}

      <line
        className='impactCompass__cross'
        x1={CX}
        y1={CY - AXIS_R}
        x2={CX}
        y2={CY + AXIS_R}
      />
      <line
        className='impactCompass__cross'
        x1={CX - AXIS_R}
        y1={CY}
        x2={CX + AXIS_R}
        y2={CY}
      />

      {/* Dominant star-rose on intro; quiet underlay on results. */}
      <g
        className='impactCompass__rose'
        opacity={isResults ? 0.18 : 1}
        filter={isResults ? undefined : `url(#${uid}-bloom)`}
      >
        <polygon
          points={rosePoints(ROSE_INNER, ROSE_OUTER, 8)}
          fill={isResults ? "currentColor" : `url(#${uid}-petal)`}
        />
        <polygon
          points={rosePoints(12, ROSE_MID, 4)}
          fill={isResults ? "currentColor" : "var(--color-page)"}
          opacity={isResults ? 1 : 0.92}
        />
        {!isResults && (
          <>
            <circle cx={CX} cy={CY} r={18} fill={`url(#${uid}-hub)`} />
            <circle
              cx={CX}
              cy={CY}
              r={6}
              fill='var(--color-page)'
              opacity={0.95}
            />
          </>
        )}
      </g>

      {dimensions.map((dimension, i) => {
        const tip = polar(i, AXIS_R);
        const label = polar(i, LABEL_R);
        return (
          <g key={dimension.id}>
            <line
              className='impactCompass__axis'
              x1={CX}
              y1={CY}
              x2={tip.x}
              y2={tip.y}
            />
            <circle
              className='impactCompass__node'
              cx={tip.x}
              cy={tip.y}
              r={isResults ? 5 : 8}
              filter={isResults ? undefined : `url(#${uid}-soft)`}
            />
            <text
              className='impactCompass__label'
              x={label.x}
              y={label.y}
              textAnchor='middle'
              dominantBaseline='middle'
            >
              {dimension.name.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Scored radar plot — results only. Intro stays a rose. */}
      {isResults && values && (
        <>
          <polygon className='impactCompass__plot' points={polygonPoints(values)} />
          {values.map((radius, i) => {
            const p = polar(i, radius);
            return (
              <circle
                key={dimensions[i].id}
                className='impactCompass__plotNode'
                cx={p.x}
                cy={p.y}
                r={4.5}
              />
            );
          })}
        </>
      )}

      {isResults && overall !== undefined && (
        <g className='impactCompass__hub'>
          <circle cx={CX} cy={CY} r={48} />
          <text
            className='impactCompass__score'
            x={CX}
            y={CY - 4}
            textAnchor='middle'
            dominantBaseline='middle'
          >
            {overall}
            <tspan className='impactCompass__outOf'> / {outOf}</tspan>
          </text>
          {overallCaption && (
            <text
              className='impactCompass__caption'
              x={CX}
              y={CY + 20}
              textAnchor='middle'
            >
              {overallCaption}
            </text>
          )}
        </g>
      )}
    </svg>
  );
};

export default ImpactCompass;
