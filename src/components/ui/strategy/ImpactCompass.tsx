import { dimensions } from "@/data/strategy";
import type { DimensionScore } from "@/lib/strategyDiagnostic";

// SVG Impact Compass — decorative on the intro, scored on the results.
// Six axes match DIMENSIONS order. Built in code (not the mock-up PNG).

const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RINGS = [0.28, 0.46, 0.64, 0.82, 1];
const AXIS_R = 118;
const LABEL_R = 148;

const polar = (index: number, radius: number) => {
  // Start at top, clockwise — matches the approved Option 3 layout.
  const angle = (-Math.PI / 2) + (index * 2 * Math.PI) / dimensions.length;
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
      dimensions.map(() => AXIS_R * 0.72);

  const plot = polygonPoints(values);
  const isResults = variant === "results";

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
        <radialGradient id='ic-glow' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='var(--color-brand-signal)' stopOpacity='0.35' />
          <stop offset='70%' stopColor='var(--color-brand)' stopOpacity='0.08' />
          <stop offset='100%' stopColor='transparent' stopOpacity='0' />
        </radialGradient>
        <filter id='ic-soft' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='2.5' result='b' />
          <feMerge>
            <feMergeNode in='b' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={AXIS_R + 28} fill='url(#ic-glow)' />

      {/* Compass rose behind the rings */}
      <g className='impactCompass__rose' opacity={isResults ? 0.2 : 0.45}>
        {[0, 45, 90, 135].map(deg => (
          <polygon
            key={deg}
            points={`${CX},${CY - 42} ${CX + 10},${CY} ${CX},${CY + 42} ${CX - 10},${CY}`}
            transform={`rotate(${deg} ${CX} ${CY})`}
            fill='currentColor'
          />
        ))}
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
              r={isResults ? 4.5 : 6}
              filter={isResults ? undefined : "url(#ic-soft)"}
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
            r={4}
          />
        );
      })}

      {isResults && overall !== undefined && (
        <g className='impactCompass__hub'>
          <circle cx={CX} cy={CY} r={42} />
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
              y={CY + 18}
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
