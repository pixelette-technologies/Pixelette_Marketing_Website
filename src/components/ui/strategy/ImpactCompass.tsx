import { dimensions } from "@/data/strategy";
import type { DimensionScore } from "@/lib/strategyDiagnostic";

// SVG Impact Compass — decorative on the intro, scored on the results.
// Six axes match DIMENSIONS order. Built in code (not the mock-up PNG).
// Corrected 20 Nov 2026: larger rose, stronger glow, denser graphic.

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RINGS = [0.22, 0.4, 0.58, 0.76, 0.94];
const AXIS_R = 132;
const LABEL_R = 168;
const OUTER_R = 148;

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
  const values = scores
    ? scores.map(
        s => (AXIS_R * Math.min(Math.max(s.percentage, 0), 100)) / 100
      )
    : // Decorative intro plot — a balanced hexagon, not sample scores.
      dimensions.map((_, i) => AXIS_R * (0.62 + (i % 3) * 0.06));

  const plot = polygonPoints(values);
  const isResults = variant === "results";
  const uid = isResults ? "icr" : "ici";

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
            stopOpacity='0.55'
          />
          <stop
            offset='45%'
            stopColor='var(--color-brand)'
            stopOpacity='0.18'
          />
          <stop offset='100%' stopColor='transparent' stopOpacity='0' />
        </radialGradient>
        <radialGradient id={`${uid}-hub`} cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='var(--color-brand-signal)' stopOpacity='0.9' />
          <stop offset='55%' stopColor='var(--color-brand)' stopOpacity='0.55' />
          <stop offset='100%' stopColor='transparent' stopOpacity='0' />
        </radialGradient>
        <filter id={`${uid}-soft`} x='-40%' y='-40%' width='180%' height='180%'>
          <feGaussianBlur stdDeviation='3.2' result='b' />
          <feMerge>
            <feMergeNode in='b' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <filter id={`${uid}-bloom`} x='-50%' y='-50%' width='200%' height='200%'>
          <feGaussianBlur stdDeviation='5' result='b' />
          <feMerge>
            <feMergeNode in='b' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={OUTER_R + 36} fill={`url(#${uid}-glow)`} />

      {/* Outer decorative ring */}
      <circle
        className='impactCompass__outer'
        cx={CX}
        cy={CY}
        r={OUTER_R}
        fill='none'
      />

      {/* Compass rose behind the rings */}
      <g className='impactCompass__rose' opacity={isResults ? 0.22 : 0.55}>
        <polygon
          points={rosePoints(14, 48, 8)}
          fill='currentColor'
          filter={isResults ? undefined : `url(#${uid}-bloom)`}
        />
        <polygon points={rosePoints(8, 28, 4)} fill='currentColor' />
        {!isResults && (
          <circle
            cx={CX}
            cy={CY}
            r={22}
            fill={`url(#${uid}-hub)`}
            opacity={0.85}
          />
        )}
      </g>

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

      {/* Cross hairs */}
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
              r={isResults ? 5 : 7}
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

      <polygon className='impactCompass__plot' points={plot} />
      {values.map((radius, i) => {
        const p = polar(i, radius);
        return (
          <circle
            key={dimensions[i].id}
            className='impactCompass__plotNode'
            cx={p.x}
            cy={p.y}
            r={isResults ? 4.5 : 5.5}
            filter={isResults ? undefined : `url(#${uid}-soft)`}
          />
        );
      })}

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
