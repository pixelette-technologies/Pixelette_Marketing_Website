"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/common";
import {
  INSIGHT_FILTERS,
  insights,
  latest,
  type InsightFilter
} from "@/data/insights/insights";
import EditorialMark from "./EditorialMark";

// /blog-list, 05 Latest thinking. 30 Sep 2026, to the final Insights brief.
//
// REPLACES the category sidebar, its search box and its phone dropdown. One
// row of pill filters, the five capabilities plus Market signals, so this page
// files its thinking the same way /services files the work.
//
// THE FILTERS ARE TOGGLE BUTTONS (aria-pressed), one pressed at a time: plain
// buttons, so Tab, Enter and Space work with nothing to learn, and the result
// count is announced politely. On a phone the row scrolls sideways inside
// itself; the page never does.
//
// A capability with nothing filed under it stays selectable and says so, with
// somewhere useful to go, rather than being hidden: the brief's filters are
// fixed, and the page is built to be honest at five pieces.

type Filter = InsightFilter | "All";

export default function LatestThinking() {
  const [active, setActive] = useState<Filter>("All");
  const shown =
    active === "All" ? insights : insights.filter(item => item.capability === active);
  const filters: Filter[] = ["All", ...INSIGHT_FILTERS];

  return (
    <div className='sec-sm'>
      <Container className='main'>
        <section className='ixLatest' aria-labelledby='ix-latest'>
          <h2 className='ixLabel ixLabel--large' id='ix-latest'>
            {latest.label}
          </h2>

          <div className='ixFilters' role='group' aria-label='Filter by capability'>
            {filters.map(filter => (
              <button
                key={filter}
                type='button'
                className='ixFilter'
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
              >
                {filter === "All" ? latest.allLabel : filter}
              </button>
            ))}
          </div>

          <p className='ix-sr' aria-live='polite'>
            {shown.length === 1 ? "1 piece" : `${shown.length} pieces`}
            {active === "All" ? "" : ` in ${active}`}
          </p>

          {shown.length > 0 ? (
            <ul className='ixGrid'>
              {shown.map(item => (
                <li key={item.id} className='ixCard'>
                  <div className='ixCard__visual'>
                    <EditorialMark format={item.format} seed={item.sections} variant={item.id} />
                  </div>
                  <div className='ixCard__body'>
                    <p className='ixTag ixTag--format'>{item.format}</p>
                    <h3 className='ixCard__title'>
                      <Link href={item.href} className='ixStretch'>
                        {item.title}
                      </Link>
                    </h3>
                    <p className='ixCard__summary'>{item.summary}</p>
                    <p className='ixMeta'>
                      <span className='ixTag ixTag--cap'>{item.capability}</span>
                      <span>{item.date}</span>
                      <span>{item.readMinutes} min read</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='ixEmpty'>
              <p>{latest.empty}</p>
              <Link href={latest.emptyCta.href} className='textLink textLink--brand'>
                {latest.emptyCta.label}
                <span aria-hidden='true'>→</span>
              </Link>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
