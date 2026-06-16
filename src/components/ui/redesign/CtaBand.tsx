import Link from "next/link";
import Reveal from "./Reveal";

/**
 * CtaBand - deep oxblood editorial close with a restrained reveal. Pure
 * typography, no device graphic. Claims-safe.
 */

export default function CtaBand() {
  return (
    <section className='pmSection pmSection--dark pmCta'>
      <Reveal className='pmWrap pmCta__inner'>
        <p className='pmEyebrow'>Start the conversation</p>
        <h2 className='pmH2'>
          Let&apos;s engineer growth that <em>compounds.</em>
        </h2>
        <p className='pmLead'>
          A focused first call to pressure-test your growth model and show you
          where the compounding starts.
        </p>
        <div className='pmCta__actions'>
          <Link href='/contactus' className='pmBtn pmBtn--magnetic'>
            Book a growth strategy call
          </Link>
          <Link href='/services' className='pmBtn pmBtn--ghost pmBtn--onDark'>
            See how we operate
          </Link>
        </div>
        <p className='pmCta__trust'>The marketing arm of Pixelette Group.</p>
      </Reveal>
    </section>
  );
}
