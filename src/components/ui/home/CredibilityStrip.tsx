import Image from "next/image";
import { Container } from "@/components/common";
import { proofCopy } from "@/data/home";

// THE INITIAL CREDIBILITY TREATMENT — 28 Sep 2026, the creative transformation
// brief, section 7 ("immediately after the hero/initial credibility
// treatment, introduce genuine evidence").
//
// The same six marks and the same claim as before — the ecosystem claim the
// About page makes, which is the one that is literally true of a row that
// includes portfolio ventures and group work. What changed is the ground.
//
// IT IS LIGHT NOW, AND THAT WAS NOT FREE. Every logo in the repository is
// knockout white, which is why TrustedBrands has always been a dark band and
// why _surfaces.scss calls the home page's first dark band "forced". The
// brief asks for exactly ONE deliberate change of atmosphere on this page,
// into the intelligence section; a black slab directly under the hero spent
// that change in the first scroll. So the marks are rendered as ink here with
// a CSS filter — brightness(0) on a white mark is a solid ink silhouette —
// and the row sits on the page's own ground as a quiet line beneath the hero.
// TrustedBrands is untouched and still dark on About and the service pages.
//
// Static, not a marquee: this is a line of reference under the hero, and the
// brief asks for less motion that loops, not more.
//
// The marks carry empty alt text and the list is named by the line above it.
// The previous alt text was "Brand Logo 0" to "Brand Logo 5", which told a
// screen reader less than nothing, and the file names are not reliable enough
// to announce as company names.

const MARKS = [
  { src: "/common/blockGold.svg", w: 124, h: 36 },
  { src: "/common/fusio.svg", w: 77, h: 36 },
  { src: "/common/digitalAssests.svg", w: 164, h: 36 },
  { src: "/common/bigInvonation.svg", w: 85, h: 46 },
  { src: "/common/fantacyFusio.svg", w: 52, h: 42 },
  { src: "/common/webBooking.svg", w: 137, h: 36 }
];

export default function CredibilityStrip() {
  return (
    <div className='credibility'>
      <Container className='main'>
        <div className='credibility__row'>
          <p className='credibility__label' id='credibility-label'>
            {proofCopy.heading}
          </p>
          <ul className='credibility__marks' aria-labelledby='credibility-label'>
            {MARKS.map(mark => (
              <li key={mark.src}>
                <Image src={mark.src} alt='' width={mark.w} height={mark.h} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
