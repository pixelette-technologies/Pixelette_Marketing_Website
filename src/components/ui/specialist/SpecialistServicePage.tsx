import { Container } from "@/components/common";
import { navCta } from "@/data/navigation";
import type { SpecialistItem, SpecialistPageConfig } from "@/data/services/specialist";
import Link from "next/link";
import CapabilityConnections from "./CapabilityConnections";
import EarnsItsPlace from "./EarnsItsPlace";
import { GrowthIntelligenceDemo, GrowthPreview } from "./growth";
import MeasureBand from "./MeasureBand";
import SectionHead from "./SectionHead";
import ServiceGroupRows from "./ServiceGroupRows";
import SpecialistHero from "./SpecialistHero";
import { HowWeWork, SpecialistFaq, WhatGoodLooksLike } from "./SpecialistSections";

// A specialist service page, whole (30 Sep 2026, the Demand & Performance
// specialist pages brief). One component for every route registered in
// data/services/specialist, so the pages share one structure by construction
// rather than by four copies agreeing.
//
// THE ORDER IS THE BRIEF'S AND IS NOT CONFIGURABLE:
//   01 hero · 02 when this earns its place · 03 what we actually do ·
//   04 what we measure · [work in practice] · 05 how this connects ·
//   06 how we work · 07 what good looks like · 08 CTA · 09 FAQ
//
// WHAT IS NOT HERE, ON PURPOSE: hero art, the ecosystem logo strip, service
// card catalogues, technology-market sections, testimonials, an embedded
// enquiry form, a second CTA strip and any statistic. Each was on the legacy
// template and the brief removes all of them. "Work in practice" renders only
// when a config carries verified evidence; none does today.
//
// COLOUR is the brief's hierarchy, from the four tokens the diagnostic
// introduced: burgundy for headings and the measure and close bands, pink for
// eyebrows, numerals and states, near-black (plum ink) for everything that is
// read. See _specialist.scss.

const BASE_URL = "https://www.pixelettemarketing.com";

/** The brief's wording, used wherever a config does not override it. */
export const SPECIALIST_DEFAULTS = {
  earnsEyebrow: "When this earns its place",
  servicesEyebrow: "What we actually do",
  measureEyebrow: "What we measure",
  connectionsEyebrow: "How this connects",
  connectionsIntro:
    "If this is the real constraint, the work may need to move here.",
  processEyebrow: "How we work",
  process: [
    {
      title: "Diagnose",
      body: "Understand the commercial problem, evidence and real constraint."
    },
    {
      title: "Prioritise",
      body: "Decide what is worth testing and what can safely wait."
    },
    {
      title: "Activate",
      body: "Launch focused work with a clear hypothesis and measurement plan."
    },
    { title: "Improve", body: "Strengthen what works and stop what does not." }
  ] as SpecialistItem[],
  goodEyebrow: "What good looks like",
  cta: {
    heading: "Have a demand problem worth solving?",
    body: "Start with the commercial problem. We’ll help determine whether this specialist intervention is actually the right place to begin."
  },
  faqEyebrow: "Useful questions"
};

const SpecialistServicePage = ({ page }: { page: SpecialistPageConfig }) => {
  const d = SPECIALIST_DEFAULTS;
  const cta = {
    heading: page.cta?.heading ?? d.cta.heading,
    body: page.cta?.body ?? d.cta.body,
    label: page.cta?.label ?? navCta.label,
    href: page.cta?.href ?? navCta.to
  };
  const url = `${BASE_URL}/services/${page.route}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: page.label, item: url }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.items.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <div className='spPage'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {page.faqs.items.length > 0 && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 01 */}
      <SpecialistHero
        eyebrow={page.hero.eyebrow ?? `${page.capability} / ${page.label}`}
        heading={page.hero.heading}
        lead={page.hero.lead}
        cta={{ label: cta.label, href: cta.href }}
        aside={page.demo ? <GrowthPreview demo={page.demo} /> : undefined}
      />

      {/* 02 */}
      <EarnsItsPlace
        eyebrow={page.earnsItsPlace.eyebrow ?? d.earnsEyebrow}
        heading={page.earnsItsPlace.heading}
        intro={page.earnsItsPlace.intro}
        items={page.earnsItsPlace.items}
        market={page.earnsItsPlace.market}
      />

      {/* Growth Intelligence only: its illustrative view, labelled so. */}
      {page.demo && <GrowthIntelligenceDemo demo={page.demo} />}

      {/* 03 */}
      <Container className='main'>
        <section className='spSection spSection--rule' aria-labelledby='sp-services'>
          <SectionHead
            id='sp-services'
            eyebrow={page.services.eyebrow ?? d.servicesEyebrow}
            heading={page.services.heading}
            intro={page.services.intro}
          />
          <ServiceGroupRows items={page.services.items} />
        </section>
      </Container>

      {/* 04 */}
      <MeasureBand
        eyebrow={page.measure.eyebrow ?? d.measureEyebrow}
        heading={page.measure.heading}
        body={page.measure.body}
        metrics={page.measure.metrics}
        note={page.measure.note}
      />

      {/* Work in practice: only with verified, service-specific evidence. */}
      {page.practice && (
        <Container className='main'>
          <section className='spSection' aria-labelledby='sp-practice'>
            <SectionHead
              id='sp-practice'
              eyebrow={page.practice.eyebrow}
              heading={page.practice.heading}
              intro={page.practice.intro}
            />
            <ul className='spPractice'>
              {page.practice.items.map(item => (
                <li className='spPractice__item' key={item.title}>
                  <h3 className='spPractice__title'>{item.title}</h3>
                  <p className='spPractice__body'>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      )}

      {/* 05 */}
      <Container className='main'>
        <section className='spSection' aria-labelledby='sp-connect'>
          <SectionHead
            id='sp-connect'
            eyebrow={page.connections.eyebrow ?? d.connectionsEyebrow}
            heading={page.connections.heading}
            intro={page.connections.intro ?? d.connectionsIntro}
          />
          <CapabilityConnections
            centre={page.connections.centre ?? page.label}
            items={page.connections.items}
            defaultIndex={page.connections.defaultIndex}
          />
        </section>
      </Container>

      {/* 06 */}
      <Container className='main'>
        <section className='spSection spSection--rule spSection--tight' aria-labelledby='sp-process'>
          <SectionHead
            id='sp-process'
            eyebrow={page.process?.eyebrow ?? d.processEyebrow}
            heading={page.process?.heading}
            intro={page.process?.intro}
          />
          <HowWeWork steps={page.process?.steps ?? d.process} />
        </section>
      </Container>

      {/* 07 */}
      <Container className='main'>
        <section className='spSection spSection--rule' aria-labelledby='sp-good'>
          <SectionHead
            id='sp-good'
            eyebrow={page.goodLooksLike.eyebrow ?? d.goodEyebrow}
            heading={page.goodLooksLike.heading}
            intro={page.goodLooksLike.intro}
          />
          <WhatGoodLooksLike points={page.goodLooksLike.points} />
        </section>
      </Container>

      {/* 08 */}
      <div className='spClose'>
        <div className='container_main'>
          <section className='spClose__body' aria-labelledby='sp-close'>
            <h2 className='spClose__heading' id='sp-close'>
              {cta.heading}
            </h2>
            <p className='spClose__text'>{cta.body}</p>
            <Link href={cta.href} className='spClose__button'>
              {cta.label}
            </Link>
          </section>
        </div>
      </div>

      {/* 09 */}
      {page.faqs.items.length > 0 && (
        <Container className='main'>
          <section className='spSection' aria-labelledby='sp-faq'>
            <SectionHead
              id='sp-faq'
              eyebrow={page.faqs.eyebrow ?? d.faqEyebrow}
              heading={page.faqs.heading}
              intro={page.faqs.intro}
            />
            <SpecialistFaq items={page.faqs.items} />
          </section>
        </Container>
      )}
    </div>
  );
};

export default SpecialistServicePage;
