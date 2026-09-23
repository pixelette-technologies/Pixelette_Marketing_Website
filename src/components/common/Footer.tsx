import { Facebook, Insta, LinkedInIcon, Logo } from "@/assets/common";
import { Heading, Text } from "../feature";
import Container from "./Container";
import ManageCookies from "./ManageCookies";
import Link from "next/link";
// Used only by the group band, which is temporarily hidden — see the
// TEMPORARILY HIDDEN block below. Restore this import with it.
// import { MdArrowOutward } from "react-icons/md";
import { servicesData } from "@/data/services/servicesData";
import { COOKIE_POLICY_HREF, PRIVACY_HREF } from "@/data/legal";

// --- 18 Sep 2026: the group footer ------------------------------------------
// Rebuilt to the structure of the Pixelette Technologies footer, so the sister
// sites share one footer shape. Top to bottom, exactly as theirs:
//
//   1. A grid: a wide brand column, then the link columns, each an h2 heading
//      over a <ul>.
//   2. The group band: "Part of Pixelette Group", an intro, and the four group
//      companies with this one marked "You are here".
//      TEMPORARILY HIDDEN since 22 Sep 2026 — commented out in place, on
//      instruction, and expected back. The footer is brand grid then legal
//      line until it returns.
//   3. The legal line.
//
// WHERE IT DELIBERATELY DIFFERS, and why:
//
// - ONE SERVICE COLUMN, headed Services, and the grid is brand + two.
//   22 Sep 2026, on instruction. It was two columns, What We Do over the eight
//   service pages and Who We Help over the five sector pages, and the label
//   pair came from the brief. The sector column is gone and the remaining
//   column takes the plain noun.
//
//   WHAT THAT COSTS, so nobody has to rediscover it: the five sector pages
//   /industries/web_3, fintech, tech, saas and ai were linked from every page
//   on the site by this column and are now reachable only from the nav and
//   from /industries. They are still in the sitemap and still indexed; they
//   have simply lost their site-wide internal links. Strategy & Positioning
//   moves the other way and gains its first footer link.
//
// - THE COMPANY COLUMN CARRIES ONLY PAGES THAT EXIST. Theirs lists Privacy
//   Statement, Terms, Modern slavery and Accessibility. A footer link to a 404
//   is worse than its absence, so each joins the column when its page does.
//   Privacy joined on 23 Sep 2026, when /privacy was written from the
//   Technologies statement; Terms, Modern slavery and Accessibility still have
//   no page.
//
// - SOCIAL ICONS STAY. Theirs has none. Management answered on 11 Sep that the
//   Facebook page stays ("there is a lot of content there"), which only means
//   anything if the channels are linked. They sit in the brand column, in the
//   slot where Technologies shows its ISO certificates — this company holds
//   none, and that ledger is not something to fill with a placeholder.
//
// - THE LEGAL LINE NOW CARRIES THE COMPANY IDENTITY, as theirs does: where the
//   company is registered, the company number, the registered office and the
//   VAT number. Management supplied all four on 22 Sep 2026, which closes the
//   gap this comment used to record. The copyright keeps its own line beside
//   them. The one thing NOT supplied is the exact registered entity name — the
//   suffix, if any — so the line names the company as the rest of the site does
//   and does not invent a "Ltd".
//
// The group descriptions are the group's own wording, taken VERBATIM from the
// Technologies footer, so every sister site describes every company the same
// way. The intro is their sentence with the company name swapped, minus a
// clause about engineering that only makes sense on their site.

/* TEMPORARILY HIDDEN — 22 Sep 2026, on instruction. Kept, not deleted; the
   band is expected back. Restore this const, the MdArrowOutward import above
   and the JSX block marked with the same words, and change nothing else.
   `.groupband` rules stay in _footer.scss untouched.

const GROUP = [
  {
    name: "Pixelette Marketing",
    current: true,
    what: "Demand, pipeline, conversion, revenue and accountable growth systems."
  },
  {
    name: "Pixelette Technologies",
    href: "https://pixelettetech.com",
    what: "Software engineering, AI & automation, blockchain and ongoing product engineering."
  },
  {
    name: "Pixelette Holdings",
    href: "https://pixeletteholdings.com",
    what: "Group-level venture partnerships, HSE/equity structures, portfolio and strategic relationships."
  },
  {
    name: "Pixelette Certified",
    href: "https://pixelettecertified.com",
    what: "Compliance readiness, cyber assurance, privacy, AI governance and ongoing compliance support."
  }
];

*/

export default function Footer() {
  return (
    <footer className='site-footer footer'>
      <Container className='main'>
        <div className='footerGrid'>
          <div className='footerBrand'>
            {/* The dark-ground mark: a page-tone wordmark beside the brand
                symbol. It was never used before because Phase C only had
                LogoBlack, whose wordmark is ink and measured about 1.4:1 on
                this ground. The name is carried by the wordmark; the symbol is
                decoration beside it. */}
            <span
              className='footerBrand__logo'
              role='img'
              aria-label='Pixelette Marketing'
            >
              <Logo />
            </span>
            <Text className='small'>
              Growth marketing built around commercial outcomes, connecting
              strategy, demand, search, pipeline, conversion and growth
              intelligence.
            </Text>
            <div className='footerSocial'>
              <a
                href='https://www.instagram.com/pixelettemarketing'
                aria-label='Instagram'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Insta />
              </a>
              <a
                href='https://www.linkedin.com/company/pixelette-marketing-uk/'
                aria-label='LinkedIn'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon />
              </a>
              <a
                href='https://www.facebook.com/p/Pixelette-Marketing-100095390971622/'
                aria-label='Facebook'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Facebook />
              </a>
            </div>
          </div>

          <div>
            <Heading className='eyebrow' level={2}>
              Services
            </Heading>
            <ul className='footerList'>
              {/* Strategy & Positioning leads the column because it is 01 of the
                  five capabilities on /services and the eight service pages
                  beneath it all assume it. The href is a literal rather than
                  DIAGNOSTIC_HREF from @/data/strategy: that module is being
                  rewritten, and the footer should not wait on it. */}
              <li>
                <Link href='/strategy-positioning' className='flink small'>
                  Strategy & Positioning
                </Link>
              </li>
              {servicesData.map(el => (
                <li key={el.route}>
                  <Link href={`/services/${el.route}`} className='flink small'>
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading className='eyebrow' level={2}>
              Company
            </Heading>
            <ul className='footerList'>
              <li>
                <Link href='/aboutus' className='flink small'>
                  About
                </Link>
              </li>
              <li>
                <Link href='/results' className='flink small'>
                  Results
                </Link>
              </li>
              <li>
                <Link href='/blog-list' className='flink small'>
                  Insights
                </Link>
              </li>
              <li>
                <Link href='/contactus' className='flink small'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href={PRIVACY_HREF} className='flink small'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href={COOKIE_POLICY_HREF} className='flink small'>
                  Cookies &amp; analytics
                </Link>
              </li>
              <li>
                {/* Theirs opens a dialog. Ours reuses the reopen behaviour the
                    cookie page already has, which brings the consent banner
                    back — the same choice, asked the way this site already
                    asks it, rather than a second consent UI. */}
                <ManageCookies
                  label='Privacy choices'
                  className='flink small footerList__button'
                />
              </li>
            </ul>
          </div>
        </div>

        {/* TEMPORARILY HIDDEN — 22 Sep 2026, on instruction. Commented rather
            than deleted because it is expected back. Restore this block, the
            GROUP const and the MdArrowOutward import, all three marked with
            these words. Nothing else was changed for it: `.groupband` and its
            children are still in _footer.scss, and `GROUP` is still the only
            place the four companies are described.

        <section className='groupband' aria-labelledby='group-heading'>
          <div className='groupband__intro'>
            <h2 id='group-heading' className='h4'>
              Part of Pixelette Group
            </h2>
            <Text className='small'>
              Pixelette Marketing is one of four companies in Pixelette Group,
              a UK technology group. Each company is engaged separately and
              none is a condition of another.
            </Text>
          </div>

          <ul className='groupband__list'>
            {GROUP.map(company => (
              <li key={company.name}>
                {company.href ? (
                  <a
                    className='groupband__name'
                    href={company.href}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {company.name}
                    <MdArrowOutward aria-hidden='true' />
                  </a>
                ) : (
                  <span className='groupband__name groupband__name--current'>
                    {company.name}
                    <span className='groupband__here'>You are here</span>
                  </span>
                )}
                <span className='groupband__what'>{company.what}</span>
              </li>
            ))}
          </ul>
        </section>

        */}

        {/* The identity row, matched to the Technologies footer: five
            discrete items across two blocks, one ranged left and one right,
            and NO copyright line — theirs carries none.

            THE NUMBERS ARE TECHNOLOGIES' OWN, on their own site: company
            11716825, 77 Fulham Palace Road and VAT GB 432 2377 17 all appear
            in their footer under 'Pixelette Technologies Ltd'. They were
            supplied to this site on 22 Sep for Pixelette Marketing, and the
            entity NAME was the one thing not supplied, which now looks like
            the reason. Either Marketing trades under Technologies Ltd or the
            wrong entity's details were handed over. Nothing is invented here:
            the name is written as the rest of the site writes it, with no
            suffix, until someone confirms which. See [[09 Outstanding]]. */}
        <div className='footerLegal'>
          <p className='legal footerId'>
            <span>Pixelette Marketing</span>{" "}
            <span>Registered in England and Wales</span>{" "}
            <span>Company number 11716825</span>
          </p>
          <p className='legal footerId footerId--end'>
            <span>Registered office 77 Fulham Palace Road, London W6 8JA</span>{" "}
            <span>VAT GB 432 2377 17</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
