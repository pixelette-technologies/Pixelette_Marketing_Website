"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import {
  measurementChannels,
  measurementInsightContent,
  measurementRanges,
  measurementStages,
  type MeasurementRangeId,
  type MeasurementStageId
} from "@/data/services/measurementInsight";

const { explore } = measurementInsightContent;

const barHeight = (value: number, multiplier: number, cap: number) =>
  Math.min(cap, Math.round(value * multiplier));

const MeasurementExplore = () => {
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rangeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [stageId, setStageId] = useState<MeasurementStageId>("performance");
  const [rangeId, setRangeId] = useState<MeasurementRangeId>("30");

  const stage =
    measurementStages.find(item => item.id === stageId) ?? measurementStages[0];
  const range =
    measurementRanges.find(item => item.id === rangeId) ?? measurementRanges[0];

  const focusStage = (id: MeasurementStageId) => {
    setStageId(id);
    tabRefs.current[id]?.focus();
  };

  const focusRange = (id: MeasurementRangeId) => {
    setRangeId(id);
    rangeRefs.current[id]?.focus();
  };

  const moveStage = (key: string) => {
    const index = measurementStages.findIndex(item => item.id === stageId);
    const last = measurementStages.length - 1;
    if (key === "Home") focusStage(measurementStages[0].id);
    if (key === "End") focusStage(measurementStages[last].id);
    if (key === "ArrowRight") {
      focusStage(measurementStages[(index + 1) % measurementStages.length].id);
    }
    if (key === "ArrowLeft") {
      focusStage(measurementStages[(index - 1 + measurementStages.length) % measurementStages.length].id);
    }
  };

  const moveRange = (key: string) => {
    const index = measurementRanges.findIndex(item => item.id === rangeId);
    const last = measurementRanges.length - 1;
    if (key === "Home") focusRange(measurementRanges[0].id);
    if (key === "End") focusRange(measurementRanges[last].id);
    if (key === "ArrowRight") {
      focusRange(measurementRanges[(index + 1) % measurementRanges.length].id);
    }
    if (key === "ArrowLeft") {
      focusRange(measurementRanges[(index - 1 + measurementRanges.length) % measurementRanges.length].id);
    }
  };

  const rows = measurementChannels.map((channel, index) => {
    const pair = stage.values[index];
    return {
      ...channel,
      previous: barHeight(pair[0], range.multiplier, 89),
      current: barHeight(pair[1], range.multiplier, 91)
    };
  });

  return (
    <section className='miExplore' aria-labelledby='mi-explore-heading'>
      <div className='container_main'>
        <p className='miEyebrow'>{explore.eyebrow}</p>
        <h2 id='mi-explore-heading' className='miTitle'>
          {explore.heading}
        </h2>
        <p className='miLead'>{explore.lead}</p>

        <div
          className='miSteps'
          role='tablist'
          aria-label='Explore the measurement journey'
          onKeyDown={event => {
            if (
              event.key === "ArrowRight" ||
              event.key === "ArrowLeft" ||
              event.key === "Home" ||
              event.key === "End"
            ) {
              event.preventDefault();
              moveStage(event.key);
            }
          }}
        >
          {measurementStages.map(item => {
            const selected = item.id === stage.id;
            return (
              <button
                key={item.id}
                type='button'
                className={selected ? "miSteps__item is-selected" : "miSteps__item"}
                id={`${baseId}-tab-${item.id}`}
                role='tab'
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                ref={node => {
                  tabRefs.current[item.id] = node;
                }}
                onClick={() => setStageId(item.id)}
              >
                <span className='miSteps__num'>{item.number}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          className='miPanel'
          role='tabpanel'
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${stage.id}`}
        >
          <div className='miPanel__head'>
            <div>
              <h3 className='miPanel__title'>{stage.title}</h3>
              <p className='miPanel__subtitle'>{stage.subtitle}</p>
            </div>
            <div
              className='miRange'
              role='radiogroup'
              aria-label='Time period'
              onKeyDown={event => {
                if (
                  event.key === "ArrowRight" ||
                  event.key === "ArrowLeft" ||
                  event.key === "Home" ||
                  event.key === "End"
                ) {
                  event.preventDefault();
                  moveRange(event.key);
                }
              }}
            >
              {measurementRanges.map(item => {
                const selected = item.id === range.id;
                return (
                  <button
                    key={item.id}
                    type='button'
                    className={selected ? "miRange__item is-selected" : "miRange__item"}
                    role='radio'
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    ref={node => {
                      rangeRefs.current[item.id] = node;
                    }}
                    onClick={() => setRangeId(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='miChart'>
            <div className='miChart__axis' aria-hidden='true'>
              <span>High</span>
              <span>Low</span>
            </div>
            {rows.map((row, index) => (
              <button
                key={row.name}
                type='button'
                className='miChart__group'
                style={{ "--mi-bar": row.color } as CSSProperties}
                aria-label={`${row.name}. Previous period ${row.previous}. Current period ${row.current}${
                  stage.id === "performance" && index === 0
                    ? `. Example: ${explore.example} ${explore.exampleNote}`
                    : ""
                }`}
              >
                {stage.id === "performance" && index === 0 ? (
                  <span className='miChart__example' aria-hidden='true'>
                    <span>{explore.example}</span>
                    <span>{explore.exampleNote}</span>
                  </span>
                ) : null}
                <span className='miChart__bars' aria-hidden='true'>
                  <span
                    className='miChart__bar miChart__bar--previous'
                    style={{ height: `${row.previous}%` }}
                  />
                  <span
                    className='miChart__bar miChart__bar--current'
                    style={{ height: `${row.current}%` }}
                  />
                </span>
                <span className='miChart__label' aria-hidden='true'>
                  {row.name}
                </span>
                <span className='miChart__tip' aria-hidden='true'>
                  Previous {row.previous}
                  <br />
                  Current {row.current}
                </span>
              </button>
            ))}
          </div>

          <ul className='miLegend'>
            <li>
              <span className='miLegend__swatch miLegend__swatch--previous' />
              Previous period
            </li>
            <li>
              <span className='miLegend__swatch miLegend__swatch--current' />
              Current period
            </li>
          </ul>

          <div className='miPanel__foot'>
            <p className='miPanel__conclusion'>{stage.conclusion}</p>
            <p className='miPanel__description'>{stage.description}</p>
          </div>

          <table className='miSr' aria-hidden='true'>
            <caption>
              {stage.title}. {stage.subtitle}. {range.label}.
              {stage.id === "performance"
                ? ` Example annotation: ${explore.example} ${explore.exampleNote}.`
                : ""}
            </caption>
            <thead>
              <tr>
                <th scope='col'>Channel</th>
                <th scope='col'>Previous period</th>
                <th scope='col'>Current period</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.name}>
                  <th scope='row'>{row.name}</th>
                  <td>{row.previous}</td>
                  <td>{row.current}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MeasurementExplore;
