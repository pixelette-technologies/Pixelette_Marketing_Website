import { Facebook, Insta, LinkedInIcon, Logo } from "@/assets/common";
import { Heading, Text } from "../feature";
import Container from "./Container";
import ManageCookies from "./ManageCookies";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";

// --- 18 Sep 2026: the group footer ------------------------------------------
// Rebuilt to the structure of the Pixelette Technologies footer, so the sister
// sites share one footer shape. Top to bottom, exactly as theirs:
//
//   1. A grid: a wide brand column, then the link columns, each an h2 heading
//      over a <ul>.
//   2. The group band: "Part of Pixelette Group", an intro, and the four group
//      companies with this one marked "You are here".
//   3. The legal line.
//
// WHERE IT DELIBERATELY DIFFERS, and why:
//
// - TWO SERVICE COLUMNS, not one. Theirs has three services under "Services";
//   ours has eight services AND five sectors, and both lists are crawl paths to
//   thirteen indexed pages. The columns keep the brief's labels, What We Do and
//   Who We Help, over unchanged URLs. So the grid is brand + three, not
//   brand + two.
//
// - THE COMPANY COLUMN CARRIES ONLY PAGES THAT EXIST. Theirs lists Privacy
//   Statement, Terms, Modern slavery and Accessibility. This app has none of
//   those pages, and a footer link to a 404 is worse than its absence — the
//   same reasoning that kept "Privacy" out of the previous footer. Each joins
//   the column when its page does.
//
// - SOCIAL ICONS STAY. Theirs has none. Management answered on 11 Sep that the
//   Facebook page stays ("there is a lot of content there"), which only means
//   anything if the channels are linked. They sit in the brand column, in the
//   slot where Technologies shows its ISO certificates — this company holds
//   none, and that ledger is not something to fill with a placeholder.
//
// - THE LEGAL LINE IS THE COPYRIGHT, NOT THE COMPANY IDENTITY. Theirs states the
//   legal entity, where it is registered, the company number, the registered
//   office and the VAT number. None of those facts exist anywhere in this repo
//   for Pixelette Marketing, and they are not facts to guess. The structure is
//   here for them; the values are with management.
//
// The group descriptions are the group's own wording, taken VERBATIM from the
// Technologies footer, so every sister site describes every company the same
// way. The intro is their sentence with the company name swapped, minus a
// clause about engineering that only makes sense on their site.

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
              Growth marketing built around commercial outcomes - connecting
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
              What We Do
            </Heading>
            <ul className='footerList'>
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
              Who We Help
            </Heading>
            <ul className='footerList'>
              {industriesData.map(el => (
                <li key={el.route}>
                  <Link
                    href={`/industries/${el.route}`}
                    className='flink small'
                  >
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
                <Link href='/cookie-policy' className='flink small'>
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

        <div className='footerLegal'>
          <Text className='legal'>
            © 2026 Pixelette Marketing. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
