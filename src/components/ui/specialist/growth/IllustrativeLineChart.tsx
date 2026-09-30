"use client";

import {
  formatNumber,
  type GrowthLineChart
} from "@/data/services/specialist/growthIntelligenceDemo";
import { useId, useMemo, useRef, useState } from "react";
import { RevealPhase, useElementWidth, useTween } from "./hooks";

// Two series on ONE axis — never two y-scales. Where the brief pairs measures
// of different size (Growth), the data is indexed to week 1 and the chart says
// so under its title.
//
// IDENTITY IS NEVER COLOUR ALONE: the primary series is a heavier burgundy
// line ending in a CIRCLE, the second a lighter pink line ending in a SQUARE,
// the legend repeats both shapes, and each line is labelled at its end with
// its value (and, where there is room, its name). A screen-reader table
// carries every point.
//
// MOTION: on first view the lines draw (about 850ms); on a mode change the
// points travel to their new places (600ms) and the axis labels cross-fade.
// Then it is still. Drawn at its real pixel width so the text never scales
// down on a phone.

interface IllustrativeLineChartProps {
  chart: GrowthLineChart;
  periods: string[];
  phase: RevealPhase;
  reduced: boolean;
  /** The hero's preview: no axis labels, no hover, no table, value labels only. */
  compact?: boolean;
  /** Changes on mode change; keys the cross-fade of the axis labels. */
  modeKey?: string;
}

function niceStep(raw: number): number {
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / pow;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * pow;
}

/** Four gridlines on round numbers. Counts start at zero when the smallest
 *  value is small next to the largest, so a low line is not exaggerated. */
function niceDomain(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = niceStep((max - min) / 4 || 1);
  const lo = min < max * 0.35 ? 0 : Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

const IllustrativeLineChart = ({
  chart,
  periods,
  phase,
  reduced,
  compact = false,
  modeKey = ""
}: IllustrativeLineChartProps) => {
  const plotRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(plotRef, compact ? 420 : 640);
  const [hover, setHover] = useState<number | null>(null);
  const titleId = useId();
  const descId = useId();

  const [a, b] = chart.series;
  const count = a.values.length;
  const wide = !compact && width >= 520;
  const height = compact ? 132 : 280;
  const margin = compact
    ? { top: 12, right: 52, bottom: 22, left: 6 }
    : { top: 16, right: wide ? 158 : 60, bottom: 32, left: 44 };
  const innerW = Math.max(40, width - margin.left - margin.right);
  const innerH = height - margin.top - margin.bottom;

  const domain = useMemo(
    () => niceDomain([...a.values, ...b.values]),
    [a.values, b.values]
  );
  const x = (i: number) => margin.left + (innerW * i) / (count - 1);
  const yOf = (v: number) =>
    margin.top + innerH - ((v - domain.lo) / (domain.hi - domain.lo)) * innerH;

  // Only the y positions tween; x follows the width directly.
  const targetYs = [...a.values, ...b.values].map(yOf);
  const ys = useTween(targetYs, 600, !reduced && phase === "shown");
  const ya = ys.slice(0, count);
  const yb = ys.slice(count);

  const pathOf = (points: number[]) =>
    points
      .map((y, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y.toFixed(1)}`)
      .join("");
  const baseline = margin.top + innerH;
  const area = `${pathOf(ya)}L${x(count - 1).toFixed(1)},${baseline}L${x(0).toFixed(1)},${baseline}Z`;

  // End labels, pushed apart when the two lines finish close together.
  let endA = ya[count - 1];
  let endB = yb[count - 1];
  if (Math.abs(endA - endB) < 18) {
    const mid = (endA + endB) / 2;
    const up = endA <= endB ? -9 : 9;
    endA = mid + up;
    endB = mid - up;
  }

  const fmt = (v: number) => formatNumber(v, chart.format);
  const lastA = a.values[count - 1];
  const lastB = b.values[count - 1];
  const description =
    `${a.name} moves from ${fmt(a.values[0])} to ${fmt(lastA)} and ` +
    `${b.name} from ${fmt(b.values[0])} to ${fmt(lastB)} across ` +
    `${count} weeks. ${chart.unitNote}. Illustrative data.`;

  const xTicks = compact || width < 420 ? [0, count - 1] : [0, 3, 7, count - 1];

  const onMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left - margin.left;
    const i = Math.round((px / innerW) * (count - 1));
    setHover(Math.max(0, Math.min(count - 1, i)));
  };

  return (
    <figure
      className={compact ? "giLine giLine--compact" : "giLine"}
      data-phase={phase}
    >
      {!compact && (
        <figcaption className='giLine__caption'>
          <span className='giFigure__title'>{chart.title}</span>
          <span className='giFigure__unit'>{chart.unitNote}</span>
        </figcaption>
      )}

      {!compact && (
        <ul className='giLegend' aria-hidden='true'>
          <li className='giLegend__item'>
            <span className='giLegend__key giLegend__key--a' />
            {a.name}
          </li>
          <li className='giLegend__item'>
            <span className='giLegend__key giLegend__key--b' />
            {b.name}
          </li>
        </ul>
      )}

      <div className='giLine__plot' ref={plotRef}>
        <svg
          className='giLine__svg'
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role='img'
          aria-labelledby={`${titleId} ${descId}`}
          onPointerMove={compact ? undefined : onMove}
          onPointerLeave={compact ? undefined : () => setHover(null)}
        >
          <title id={titleId}>{chart.title}</title>
          <desc id={descId}>{description}</desc>

          <g className='giLine__grid' key={`grid-${modeKey}`}>
            {domain.ticks.map(tick => (
              <g key={tick}>
                <line
                  x1={margin.left}
                  x2={margin.left + innerW}
                  y1={yOf(tick)}
                  y2={yOf(tick)}
                  className='giLine__gridline'
                />
                {!compact && (
                  <text
                    x={margin.left - 8}
                    y={yOf(tick)}
                    className='giLine__ytick'
                  >
                    {fmt(tick)}
                  </text>
                )}
              </g>
            ))}
          </g>

          {xTicks.map(i => (
            <text
              key={i}
              x={x(i)}
              y={height - (compact ? 6 : 10)}
              className='giLine__xtick'
              textAnchor={
                i === 0 ? "start" : i === count - 1 ? "end" : "middle"
              }
            >
              {periods[i]}
            </text>
          ))}

          <path d={area} className='giLine__area' />
          <path
            d={pathOf(ya)}
            pathLength={1}
            className='giLine__path giLine__path--a'
          />
          <path
            d={pathOf(yb)}
            pathLength={1}
            className='giLine__path giLine__path--b'
          />

          {hover !== null && (
            <g className='giLine__hover'>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={margin.top}
                y2={baseline}
                className='giLine__rule'
              />
              <circle
                cx={x(hover)}
                cy={ya[hover]}
                r={4.5}
                className='giLine__dot giLine__dot--a'
              />
              <rect
                x={x(hover) - 4}
                y={yb[hover] - 4}
                width={8}
                height={8}
                className='giLine__dot giLine__dot--b'
              />
            </g>
          )}

          <g className='giLine__ends'>
            <circle
              cx={x(count - 1)}
              cy={ya[count - 1]}
              r={5}
              className='giLine__dot giLine__dot--a'
            />
            <rect
              x={x(count - 1) - 4.5}
              y={yb[count - 1] - 4.5}
              width={9}
              height={9}
              className='giLine__dot giLine__dot--b'
            />
            <text x={x(count - 1) + 12} y={endA} className='giLine__endLabel'>
              <tspan className='giLine__endValue'>{fmt(lastA)}</tspan>
              {wide && <tspan dx={6}>{a.name}</tspan>}
            </text>
            <text x={x(count - 1) + 12} y={endB} className='giLine__endLabel'>
              <tspan className='giLine__endValue'>{fmt(lastB)}</tspan>
              {wide && <tspan dx={6}>{b.name}</tspan>}
            </text>
          </g>
        </svg>

        {!compact && (
          <p className='giLine__readout' aria-hidden='true'>
            {hover !== null && (
              <>
                <strong>{periods[hover]}</strong>
                <span>
                  {a.name} {fmt(a.values[hover])}
                </span>
                <span>
                  {b.name} {fmt(b.values[hover])}
                </span>
              </>
            )}
          </p>
        )}
      </div>

      {!compact && (
        // A table ignores a 1px width, so the hiding is done by a wrapper.
        <div className='giSr'>
          <table>
            <caption>
              {chart.title} ({chart.unitNote}). Illustrative data.
            </caption>
            <thead>
              <tr>
                <th scope='col'>Week</th>
                <th scope='col'>{a.name}</th>
                <th scope='col'>{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((period, i) => (
                <tr key={period}>
                  <th scope='row'>{period}</th>
                  <td>{fmt(a.values[i])}</td>
                  <td>{fmt(b.values[i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
};

export default IllustrativeLineChart;
