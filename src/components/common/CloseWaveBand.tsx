import Link from "next/link";

// Shared close band used on Social Value, Accessibility, and About Us:
// burgundy wave into a dark CTA strip. Copy stays page-local via props.

type CloseWaveBandProps = {
  heading: string;
  copy: string;
  cta: { label: string; href: string };
  headingId: string;
};

const CloseWaveBand = ({ heading, copy, cta, headingId }: CloseWaveBandProps) => {
  return (
    <section className='closeWave' aria-labelledby={headingId}>
      <svg
        className='closeWave__wave'
        viewBox='0 0 1440 96'
        preserveAspectRatio='none'
        aria-hidden='true'
      >
        <path
          fill='currentColor'
          d='M0 96V58C160 22 340 8 560 28C760 46 900 78 1080 52C1240 28 1360 10 1440 18V96H0Z'
        />
      </svg>
      <div className='closeWave__band'>
        <div className='closeWave__inner'>
          <h2 id={headingId}>{heading}</h2>
          <p>{copy}</p>
          <Link href={cta.href} className='closeWave__cta'>
            {cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CloseWaveBand;
