import type { Metadata } from "next";
import { Container } from "@/components/common";
import ManageCookies from "@/components/common/ManageCookies";

export const metadata: Metadata = {
  title: "Cookie Policy | Pixelette Marketing",
  description:
    "How Pixelette Marketing uses cookies, the analytics cookies we set only with your consent, and how to change your choice.",
  alternates: { canonical: "https://www.pixelettemarketing.com/cookie-policy" }
};

const articleStyle: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  padding: "64px 0",
  color: "#282828",
  lineHeight: 1.7
};

export default function CookiePolicyPage() {
  return (
    <Container className="main">
      <article style={articleStyle}>
        <h1 style={{ marginBottom: 8 }}>Cookie Policy</h1>
        <p style={{ opacity: 0.7, marginTop: 0 }}>Last updated: 2 June 2026</p>

        <p>
          This page explains how Pixelette Marketing uses cookies and similar
          technologies on pixelettemarketing.com.
        </p>

        <h2 style={{ marginTop: 32 }}>What cookies are</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help sites work and give site owners information about
          how the site is used.
        </p>

        <h2 style={{ marginTop: 32 }}>The cookies we use</h2>
        <p>
          We use Google Analytics 4 to understand how visitors use our site so
          we can improve it. These are analytics cookies. They are not strictly
          necessary, so we only set them after you accept them. If you reject
          them, they are not set.
        </p>
        <ul>
          <li>
            <strong>_ga and _ga_*</strong> (Google Analytics): distinguish
            unique visitors and sessions to produce aggregate usage statistics.
            Set by Google and typically retained for up to two years.
          </li>
        </ul>
        <p>
          We do not use advertising or profiling cookies. We use Google Consent
          Mode, which keeps analytics storage disabled until you give consent.
        </p>

        <h2 style={{ marginTop: 32 }}>Your choice and how to change it</h2>
        <p>
          When you first visit, a banner lets you accept or reject analytics
          cookies. Rejecting is as easy as accepting. You can change your choice
          at any time using the button below.
        </p>
        <ManageCookies />

        <h2 style={{ marginTop: 32 }}>More information</h2>
        <p>
          For more on how Google uses data from sites that use its services, see
          the{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google cookie information
          </a>{" "}
          page. For your rights under UK data protection law, see the{" "}
          <a
            href="https://ico.org.uk/for-the-public/online/cookies/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICO guidance on cookies
          </a>
          .
        </p>
      </article>
    </Container>
  );
}
