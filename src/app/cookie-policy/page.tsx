import type { Metadata } from "next";
import { Container } from "@/components/common";
import ManageCookies from "@/components/common/ManageCookies";
import { Heading, Text } from "@/components/feature";

export const metadata: Metadata = {
  title: "Cookie Policy | Pixelette Marketing",
  description:
    "How Pixelette Marketing uses cookies, the analytics cookies we set only with your consent, and how to change your choice.",
  alternates: { canonical: "https://www.pixelettemarketing.com/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | Pixelette Marketing",
    url: "https://www.pixelettemarketing.com/cookie-policy",
    siteName: "Pixelette Marketing",
    type: "website"
  }
};

// 18 Sep 2026. Taken onto the design system. The page was a bare <article>
// with an inline style object and unclassed h1/h2/p, so it rendered in the
// browser's defaults: default-blue links, stock heading sizes, and a 9px
// "Change your cookie preferences" button from ManageCookies' inline style.
//
// It now takes the interior-page anatomy every other route uses — the
// .wash-left hero carrying the one h1 — and the body takes .prose, the
// primitive that exists for article bodies and had no call site until now. It
// supplies the display headings, the body measure and the brand-coloured
// underlined links, so nothing on this page needs a style of its own beyond
// its column width.
//
// THE WORDING IS UNCHANGED, every sentence, down to the date. This is a legal
// page: restyling it is layout, and editing it is not ours to do.
export default function CookiePolicyPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <header className='legalHero'>
            <Heading className='h1p' level={1}>
              Cookie Policy
            </Heading>
            <Text className='small'>Last updated: 2 June 2026</Text>
          </header>
        </Container>
      </div>

      <Container className='main'>
        <article className='prose legalBody'>
          <p className='lead'>
            This page explains how Pixelette Marketing uses cookies and similar
            technologies on pixelettemarketing.com.
          </p>

          <h2>What cookies are</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help sites work and give site owners information about
            how the site is used.
          </p>

          <h2>The cookies we use</h2>
          <p>
            We use Google Analytics 4 to understand how visitors use our site so
            we can improve it. These are analytics cookies. They are not strictly
            necessary, so we only set them after you accept them. If you reject
            them, they are not set.
          </p>
          <ul className='list'>
            <li>
              <strong>_ga and _ga_*</strong> (Google Analytics): distinguish
              unique visitors and sessions to produce aggregate usage
              statistics. Set by Google and typically retained for up to two
              years.
            </li>
          </ul>
          <p>
            We do not use advertising or profiling cookies. We use Google
            Consent Mode, which keeps analytics storage disabled until you give
            consent.
          </p>

          <h2>Your choice and how to change it</h2>
          <p>
            When you first visit, a banner lets you accept or reject analytics
            cookies. Rejecting is as easy as accepting. You can change your
            choice at any time using the button below.
          </p>
          {/* The system's filled control, replacing the inline 9px button. */}
          <ManageCookies className='btn' />

          <h2>More information</h2>
          <p>
            For more on how Google uses data from sites that use its services,
            see the{" "}
            <a
              href='https://policies.google.com/technologies/cookies'
              target='_blank'
              rel='noopener noreferrer'
            >
              Google cookie information
            </a>{" "}
            page. For your rights under UK data protection law, see the{" "}
            <a
              href='https://ico.org.uk/for-the-public/online/cookies/'
              target='_blank'
              rel='noopener noreferrer'
            >
              ICO guidance on cookies
            </a>
            .
          </p>
        </article>
      </Container>
    </>
  );
}
