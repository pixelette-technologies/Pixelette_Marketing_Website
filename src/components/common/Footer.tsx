import { Facebook, Insta, LinkedInIcon } from "@/assets/common";
import { Heading, Text } from "../feature";
import Container from "./Container";
import Link from "next/link";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";

// The footer was a single bar: copyright, one Cookie Policy link and three
// social icons. The guide's footer is a dark multi-column sitemap, and there
// was nothing here to re-split into one.
//
// RECORDED DEVIATION, NOW RESOLVED. Phase C added these columns deliberately,
// and recorded that the guide draws FIVE columns with the first a brand column
// carrying a wordmark and a description — neither of which was available: there
// was no footer description copy anywhere in the repo, and the wordmark is
// crimson, which measures about 1.4:1 on this ground and would be invisible.
//
// The 8 Sep 2026 brief supplies the description. So the brand column exists
// now and the deviation closes. The wordmark still does not: the name is set
// as type in the footer's own body tone rather than as the crimson mark.
//
// Column headings follow the brief's navigation labels — What We Do and Who We
// Help rather than Services and Industries — while the URLs underneath are
// unchanged.

export default function Footer() {
  return (
    <footer className='site-footer footer'>
      <Container className='main'>
        <div className='footerColumns'>
          <div className='footerBrand'>
            <Heading className='h4 footerBrand__name' level={2}>
              Pixelette Marketing
            </Heading>
            <Text className='small'>
              Growth marketing built around commercial outcomes - connecting
              strategy, demand, search, pipeline, conversion and growth
              intelligence.
            </Text>
          </div>

          <div>
            <div className='eyebrow'>What We Do</div>
            {servicesData.map(el => (
              <Link
                key={el.route}
                href={`/services/${el.route}`}
                className='flink small'
              >
                {el.title}
              </Link>
            ))}
          </div>

          <div>
            <div className='eyebrow'>Who We Help</div>
            {industriesData.map(el => (
              <Link
                key={el.route}
                href={`/industries/${el.route}`}
                className='flink small'
              >
                {el.title}
              </Link>
            ))}
          </div>

          <div>
            <Link href='/results' className='flink small'>
              Results
            </Link>
            <Link href='/blog-list' className='flink small'>
              Insights
            </Link>
            <Link href='/aboutus' className='flink small'>
              About
            </Link>
            <Link href='/contactus' className='flink small'>
              Contact
            </Link>
          </div>

          <div>
            {/* The brief's footer lists Privacy alongside Cookies. There is no
                privacy policy page in this app and no verified URL for one, and
                the alternative — linking to a page that 404s, or writing legal
                text — is worse than the omission. It joins this column when a
                policy exists. See the publication gates. */}
            <Link href='/cookie-policy' className='flink small'>
              Cookies
            </Link>
          </div>
        </div>

        <div className='rule' />

        <div className='footerLegal'>
          <Text className='text_secondry legal'>
            © 2026 Pixelette Marketing. All rights reserved.
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
            {/* The brief names LinkedIn and Instagram, then "other active
                channels only". Whether this page is actively maintained is a
                fact this repo does not hold, and removing a working channel is
                the more destructive guess, so it stays pending verification. */}
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
      </Container>
    </footer>
  );
}
