import Link from "next/link";

// Shared service-page close CTA: tint banner + diagonal wash + pill button.
// Matches the locked SEO close treatment; copy stays page-local via props.

type ServiceCloseBandProps = {
  heading: string;
  lead?: string;
  cta: { label: string; href: string };
  headingId: string;
};

const ServiceCloseBand = ({
  heading,
  lead,
  cta,
  headingId
}: ServiceCloseBandProps) => {
  return (
    <section className='serviceCloseBand' aria-labelledby={headingId}>
      <div className='container_main'>
        <div className='serviceCloseBand__banner'>
          <div className='serviceCloseBand__copy'>
            <h2 id={headingId} className='serviceCloseBand__heading'>
              {heading}
            </h2>
            {lead ? <p className='serviceCloseBand__lead'>{lead}</p> : null}
          </div>
          <Link href={cta.href} className='serviceCloseBand__cta'>
            {cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCloseBand;
