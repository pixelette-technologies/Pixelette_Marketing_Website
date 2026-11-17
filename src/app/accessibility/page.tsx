import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { CONTACT_EMAIL } from "@/data/contactUs";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Accessibility",
  description:
    "Voluntary accessibility statement for pixelettemarketing.com, and how we work to WCAG 2.2 AA on client work.",
  path: "/accessibility"
});

export default function AccessibilityPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Accessibility
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='own-site-title'>
          <Heading className='h2' level={2} id='own-site-title'>
            Our own website
          </Heading>
          <Text className='body'>
            This statement applies to www.pixelettemarketing.com.
          </Text>
          <Text className='body'>
            We are not a public sector body, so the Public Sector Bodies
            (Websites and Mobile Applications) (No. 2) Accessibility Regulations
            2018 do not apply to us. We publish this statement anyway, because
            we do accessibility work for organisations the regulations do apply
            to, and our own site is the first thing you should be allowed to
            check.
          </Text>
          <Heading className='h3' level={3} id='conformance-title'>
            Conformance
          </Heading>
          <Text className='body'>
            This website&apos;s WCAG 2.2 AA conformance level has not yet been
            established by a completed audit. We will not claim &quot;fully&quot;
            or &quot;partially&quot; compliant until that audit is done. Known
            issues, test method and review date will be published from the audit
            findings.
          </Text>
          <Text className='body'>
            How to report a problem:{" "}
            <a className='textLink' href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            — we respond the same working day.
          </Text>
        </section>

        <section className='sec' aria-labelledby='client-work-title'>
          <Heading className='h2' level={2} id='client-work-title'>
            Accessibility in the work we deliver
          </Heading>
          <Text className='body'>
            For client work we build to WCAG 2.2 AA, which is the standard
            GOV.UK guidance names for compliance with the 2018 regulations.
          </Text>
          <Text className='body'>What that means in practice:</Text>
          <ul className='body'>
            <li>
              HTML by default, PDF by exception. GOV.UK guidance requires public
              bodies to make new PDFs and documents accessible, and names
              inaccessible PDF forms among the most common problems. We publish
              in HTML unless a document genuinely needs to be a document, and
              we produce accessible PDFs when it does
            </li>
            <li>
              Accessibility designed in, not retrofitted — colour contrast,
              structure, alternative text and captions as part of production
            </li>
            <li>
              An accessibility statement you can actually publish, covering the
              four things the guidance requires it to cover: your compliance
              status, which parts do not meet the standard and why, how people
              can get alternatives to inaccessible content, and how to report a
              problem including where to escalate
            </li>
            <li>
              The exemptions, told honestly. Not everything needs fixing.
              Content published before the relevant dates, and a school&apos;s
              own site beyond what people need to use its services, may be
              exempt. We would rather scope you out of unnecessary work than
              bill for it
            </li>
          </ul>
        </section>
        <Text className='small'>
          Last updated 17 November 2026 · Version 1.0
        </Text>
      </Container>
    </>
  );
}
