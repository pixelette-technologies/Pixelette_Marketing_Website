import { Facebook, Insta, LinkedInIcon } from "@/assets/common";
import { Text } from "../feature";
import Container from "./Container";
import Link from "next/link";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";

// The footer was a single bar: copyright, one Cookie Policy link and three
// social icons. The guide's footer is a dark multi-column sitemap, and there
// was nothing here to re-split into one.
//
// RECORDED DEVIATION. Under the strict content rule, adding these columns adds
// links to the footer DOM that were not there before. It was approved
// deliberately in Phase C. No copy is newly written: every label and every href
// already exists in Navbar.tsx, servicesData and industriesData.
//
// The guide draws five columns, the first a brand column carrying the wordmark
// and a description. Neither is available: there is no footer description copy,
// and the wordmark is crimson, which measures about 1.4:1 on this ground and
// would be invisible. Where the guide demands something that cannot be
// supplied, the pattern ships without it — so this is four link columns.
//
// Column eyebrows are held to the same rule. "Services" and "Industries" are
// existing navigation labels; there is no existing copy reading "Company" or
// "Legal", so those two columns carry no eyebrow rather than inventing one.

export default function Footer() {
  return (
    <footer className='site-footer footer'>
      <Container className='main'>
        <div className='footerColumns'>
          <div>
            <div className='eyebrow'>Services</div>
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
            <div className='eyebrow'>Industries</div>
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
            <Link href='/blog-list' className='flink small'>
              Blogs
            </Link>
            <Link href='/aboutus' className='flink small'>
              About Us
            </Link>
            <Link href='/contactus' className='flink small'>
              Contact Us
            </Link>
          </div>

          <div>
            <Link href='/cookie-policy' className='flink small'>
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className='rule' />

        <div className='footerLegal'>
          <Text className='secondry legal'>
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
