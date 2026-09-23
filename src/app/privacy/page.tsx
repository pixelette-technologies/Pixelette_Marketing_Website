import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common";
import ManageCookies from "@/components/common/ManageCookies";
import { Heading, Text } from "@/components/feature";
import { COOKIE_POLICY_HREF } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Statement | Pixelette Marketing",
  description:
    "How Pixelette Marketing collects, uses, shares and protects personal information, how long we keep it, and the rights you have over it.",
  alternates: { canonical: "https://www.pixelettemarketing.com/privacy" }
};

// --- 23 Sep 2026 ------------------------------------------------------------
// ADAPTED FROM THE PIXELETTE TECHNOLOGIES PRIVACY STATEMENT (their /privacy,
// v2.0, effective 17 Sep 2026), on instruction, so the group's sites describe
// their data handling in one voice. The structure, the rights, the complaints
// route and the retention periods are theirs.
//
// WHAT WAS CHANGED IS WHAT HAD TO BE TRUE OF THIS SITE, not of theirs, and
// each difference was checked against this codebase rather than assumed:
//
// - ANALYTICS. Theirs runs none and sets no cookies. This site runs Google
//   Analytics 4 behind Consent Mode, with a first-visit banner — see
//   lib/consent.ts, which records exactly what is and is not sent. The
//   cookieless-ping sentence is there because that file says "nothing is sent
//   to Google" would be false.
// - THE STORED PREFERENCE is pmw-consent in localStorage, not their
//   pt-analytics.
// - PROVIDERS. Theirs names Vercel, Supabase and Resend. This site has no
//   database: the enquiry reaches us as an email sent by Resend, and the
//   server keeps a delivery receipt and a rate-limit record, neither of which
//   holds the enquiry text or the raw IP address (contactDeliveryControl.ts).
//   Google is added as the analytics provider.
// - REMOVED OUTRIGHT: the website assistant and AI section (this site has no
//   assistant), and the ISO/IEC 27001 sentence (this company holds no
//   certificate — see the note in Footer.tsx about the empty ISO slot).
// - THE FORM'S FIELDS are this form's, from contactUsValidation.ts.
// - CLIENT WORK is described as marketing work — audiences, email lists,
//   CRM and campaign data — rather than software.
//
// TWO THINGS HERE ARE NOT VERIFIED AND NEED A HUMAN BEFORE LAUNCH:
// 1. THE CONTROLLER'S IDENTITY. The company number, office and VAT number are
//    the ones the footer carries, supplied on 22 Sep for Pixelette Marketing —
//    and they are also the ones Pixelette Technologies Ltd publishes as its
//    own. If Pixelette Marketing is a trading name of that company, the
//    controller line should name Pixelette Technologies Ltd. See
//    [[09 Outstanding]].
// 2. THE RETENTION PERIODS (24 months, six years) are the group's, adopted
//    unchanged. Nothing in this app deletes anything on a timer, which is
//    exactly what the statement says, but the periods are a commitment
//    somebody has to be keeping.

const CONTACT_EMAIL = "sales@pixelettemarketing.com";

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <header className='legalHero'>
            <Heading className='h1p' level={1}>
              Privacy Statement
            </Heading>
            <Text className='small'>Effective 23 September 2026 · Version 1.0</Text>
          </header>
        </Container>
      </div>

      <Container className='main'>
        <article className='prose legalBody'>
          <p className='lead'>
            How Pixelette Marketing uses, protects and manages personal
            information across this website and our work.
          </p>

          <h2 id='about'>About this statement, and about us</h2>
          <p>
            This statement explains what Pixelette Marketing does with personal
            information: what we collect, why we are allowed to hold it, who
            else handles it, how long we keep it and what you can require of us.
            It covers pixelettemarketing.com and the ordinary course of dealing
            with us as a client, supplier or contact.
          </p>
          <p>
            Pixelette Marketing is the controller for the information described
            here. We are registered in England and Wales under company number
            11716825, with our registered office at 77 Fulham Palace Road,
            London W6 8JA. Our VAT registration number is GB 432 2377 17.
          </p>
          <p>
            For anything in this statement, or about your information
            generally, write to <Mail />. A person reads that address.
          </p>
          <p>
            This statement does not cover information we handle on a client’s
            behalf while running their marketing. In that work the client
            decides what happens to it, and we act on their instructions. That
            arrangement is described under{" "}
            <a href='#client-work'>work we do for clients</a>.
          </p>

          <h2 id='collect'>Information we collect</h2>
          <p>
            We would rather hold less than more. The list below is short
            because the site is built that way, not because it has been
            summarised.
          </p>

          <h3>What you give us</h3>
          <p>
            If you complete the enquiry form we receive your first and last
            name, your work email address and your description of what is
            happening now. If you choose to give them, we also receive your
            company name, your company website and what you are trying to
            improve. We record that you confirmed the privacy notice, which
            version of it you saw, when you started filling the form in, the
            page you sent it from, the page that referred you to the site and,
            if you arrived through one of our campaign links, the campaign tags
            in that link.
          </p>
          <p>
            If you email or call us instead, we have whatever you put in that
            message and whatever follows in the conversation. As a client or
            supplier, we hold the business contact details and correspondence
            needed to run the engagement: the people we deal with, what was
            agreed, invoices and the ordinary record of the work.
          </p>

          <h3>What the site generates</h3>
          <p>
            Serving a web page involves your device asking our host for it, and
            our host keeps short-lived operational records of those requests in
            order to serve the site and defend it from abuse. We do not build
            those records into a profile and we do not connect them to an
            enquiry.
          </p>
          <p>
            To stop the enquiry form being flooded, the server counts recent
            submissions from each network address. It does not store the
            address itself: it stores a one-way keyed code derived from it,
            together with the times of recent submissions. We do not record
            your IP address, your browser or your device alongside your
            enquiry.
          </p>
          <p>
            What the site does with analytics is described under{" "}
            <a href='#analytics'>analytics, cookies and your privacy choices</a>.
          </p>

          <h3>Please do not send more than you need to</h3>
          <p>
            The enquiry form is for telling us about a growth challenge. Please
            do not use it to send confidential material, passwords, health or
            other special-category information, or personal information about
            people who are not expecting it. If a conversation genuinely needs
            that material, we will agree a proper route for it first.
          </p>

          <h3>Recruitment and events</h3>
          <p>
            If you apply for a role with Pixelette Marketing, we may process the
            information you provide as part of your application, together with
            information reasonably required to assess it and, where relevant,
            to complete pre-employment checks.
          </p>
          <p>
            If you register for an event, webinar, briefing or other session we
            organise, we may process your registration details and, where
            relevant, information about your attendance.
          </p>

          <h3>Social media</h3>
          <p>
            We link to our Instagram, LinkedIn and Facebook pages. Those are
            ordinary links: there is no social plug-in, embed, share button or
            advertising pixel on this site, so visiting a page here tells no
            social network anything about you. If you follow a link and
            interact with us there, that platform’s own terms and privacy notice
            apply, and we see only what the platform shows us.
          </p>

          <h3 id='marketing'>Business development and marketing</h3>
          <p>
            We may use business contact information given to us directly, or
            obtained from appropriate public, professional or business sources,
            to identify organisations and people who may have a legitimate
            interest in our services.
          </p>
          <p>
            Where personal information is involved, we process it in line with
            data protection and electronic marketing law. You can object to
            direct marketing at any time and we will respect that. We do not
            sell personal information, and we do not share it with third
            parties for their own marketing.
          </p>

          <h2 id='use'>How and why we use information</h2>
          <p>For each thing we do, the lawful basis we rely on:</p>
          <ul className='list'>
            <li>
              <strong>Reading and answering your enquiry:</strong> our
              legitimate interest in replying to a business enquiry you chose
              to send us.
            </li>
            <li>
              <strong>
                Scoping work and taking steps towards a contract at your
                request:
              </strong>{" "}
              steps taken before entering into a contract.
            </li>
            <li>
              <strong>
                Delivering and administering an engagement, including invoicing:
              </strong>{" "}
              performance of our contract with you or your organisation.
            </li>
            <li>
              <strong>Keeping a record of what was asked and answered:</strong>{" "}
              our legitimate interest in an accurate record of our business
              dealings.
            </li>
            <li>
              <strong>
                Keeping the website available and preventing abuse of the form:
              </strong>{" "}
              our legitimate interest in the security of our own systems.
            </li>
            <li>
              <strong>Measuring how the website is used:</strong> your consent,
              given through the cookie banner or Privacy choices.
            </li>
            <li>
              <strong>
                Meeting tax, accounting and other legal obligations:
              </strong>{" "}
              compliance with a legal obligation.
            </li>
          </ul>
          <p>
            Where we rely on legitimate interests we have weighed them against
            your interests, and you can object. See{" "}
            <a href='#rights'>your rights</a>.
          </p>
          <p>
            No decision with legal or similarly significant effects is made
            about you by automated means. Whether we reply, what we say and
            whether we propose working together are decisions made by people.
          </p>

          <h2 id='analytics'>Analytics, cookies and your privacy choices</h2>
          <p>
            We use Google Analytics 4 to understand how the website is used, so
            we can improve its content and performance. Its cookies are
            analytics cookies, which are not strictly necessary, so they are
            set only if you accept them. If you reject them, or never answer,
            they are not set.
          </p>
          <p>
            Google’s tag loads on every page. Until you accept analytics it
            sets no cookies, although Google may still receive basic signals
            without cookies that a page was visited. Its advertising and ad
            personalisation features are switched off, and we never send your
            name, email address or enquiry details to Google Analytics.
          </p>
          <p>
            We run no remarketing, no session recording or heatmaps and no
            profiling of individual visitors, and we do not match website
            behaviour to a person or to a CRM record.
          </p>

          <h3>Your privacy choices</h3>
          <p>
            On your first visit a banner asks whether to allow analytics, and
            rejecting is as easy as accepting. Privacy choices, in the footer
            of every page, lets you change that answer at any time. Switching
            analytics off also removes the analytics cookies an earlier yes
            left behind.
          </p>
          <p>
            So that we can respect your answer, we store one preference in your
            browser: <strong>pmw-consent</strong>, holding either granted or
            denied. It contains no identifier and is never sent to us. Our{" "}
            <Link href={COOKIE_POLICY_HREF}>Cookie Policy</Link> lists every
            cookie involved and how long it lasts.
          </p>
          <ManageCookies className='btn' />

          <h2 id='sharing'>Who else handles it, and where it goes</h2>
          <p>
            Your enquiry is read by the people here who need to answer it.
            Beyond that, three providers are involved, and we name them rather
            than describing them vaguely:
          </p>
          <ul className='list'>
            <li>
              <strong>Vercel</strong> hosts and serves this website, and
              processes the enquiry form when you send it.
            </li>
            <li>
              <strong>Resend</strong> delivers your enquiry to us as an email.
            </li>
            <li>
              <strong>Google</strong> provides Google Analytics, only as
              described above.
            </li>
          </ul>
          <p>
            Once an enquiry reaches us, our email is carried by our mailbox
            provider in the ordinary way of any business correspondence. We
            also share information with our professional advisers, and with a
            regulator or other body where the law requires it.
          </p>
          <p>
            Each provider is engaged to process this information for us, for
            the purpose described, under that provider’s data processing terms.
            If you are assessing us as a supplier and need the contractual
            position or the current list in writing, ask and we will send it
            to your reviewer.
          </p>

          <h3>Transfers out of the United Kingdom</h3>
          <p>
            We have not restricted the regions in which these providers process
            information, so you should assume your information is handled
            outside the United Kingdom, including in the United States. Under
            UK data protection law that is a restricted transfer and it needs a
            safeguard. The safeguard is in each provider’s data processing
            terms: the European Commission’s standard contractual clauses
            together with the UK Addendum that adapts them for UK transfers, or
            the UK’s own recognised transfer mechanisms where a provider relies
            on them.
          </p>

          <h2 id='security'>Security</h2>
          <p>
            The site is served over an encrypted connection, enquiries are
            encrypted in transit, and access to them is limited to the people
            who need it. The form checks where a submission came from, limits
            how often it can be sent and rejects oversized or malformed
            requests.
          </p>
          <p>
            Nobody can promise a system is impossible to break into, and we are
            not going to. What we can tell you is what we do, which is above,
            and that if something went wrong and your information were
            affected, we would tell you and the regulator where the law
            requires it.
          </p>

          <h2 id='retention'>How long we keep it</h2>
          <p>
            We keep an enquiry for 24 months from the last time we were in
            contact with you about it, and then delete it. If nothing follows
            your first message, the clock starts there. Deleting is something we
            do, not something a machine does on a timer, and we would rather
            tell you that than leave you picturing an automatic expiry that
            does not exist. If you think we are holding something past it, say
            so and we will check.
          </p>
          <p>
            You do not have to wait. Ask us to delete your enquiry at any point
            and we will, without asking why. Where we have worked together, the
            record becomes part of the client file and is kept for the
            engagement and for six years afterwards, which is the period we may
            need it for legal and tax purposes.
          </p>

          <h2 id='client-work'>Work we do for clients</h2>
          <p>
            Marketing work often involves personal information belonging to our
            clients’ own customers and prospects: email lists, CRM records,
            campaign audiences and the data that comes back from campaigns. In
            that work the client is the controller and we are the processor.
            They decide what the information is for and what may be done with
            it, and we act on their documented instructions under the data
            processing terms in our contract with them.
          </p>
          <p>
            This statement does not govern that information and we are not the
            right people to ask about it. If you are a customer of one of our
            clients and want to know what is held about you, or to exercise a
            right over it, approach that organisation. If a request reaches us
            instead we will pass it to them rather than act on it ourselves,
            because acting on it is exactly what a processor must not do.
          </p>

          <h2 id='rights'>Your rights</h2>
          <p>
            Under UK data protection law you may ask us for a copy of the
            personal information we hold about you, have inaccurate information
            corrected, have information deleted, ask us to restrict how we use
            it, and receive it in a portable form where that applies.
          </p>
          <p>
            Where we rely on our legitimate interests you have the right to
            object, and we will stop unless we have compelling grounds to
            continue. Where we rely on your consent you can withdraw it at any
            time, which does not affect anything done before you did. The right
            to object to direct marketing is absolute and is set out under{" "}
            <a href='#marketing'>business development and marketing</a>.
          </p>
          <p>
            To exercise any of these, email <Mail />. We will respond within
            one month and there is no charge. We may ask you to confirm who you
            are before we release information, which protects you rather than
            us.
          </p>

          <h2 id='complaints'>Complaints</h2>
          <p>
            If you are unhappy with how we have handled your information, tell
            us first at <Mail /> so that we can put it right. We will
            acknowledge your complaint within 30 days, look into it and report
            the outcome.
          </p>
          <p>
            You also have the right to complain to the Information
            Commissioner’s Office, the UK supervisory authority, at{" "}
            <a href='https://ico.org.uk' target='_blank' rel='noopener noreferrer'>
              ico.org.uk
            </a>{" "}
            or on 0303 123 1113. You do not have to come to us first, though we
            would rather you did.
          </p>

          <h2 id='children'>Children</h2>
          <p>
            This is a business website and our services are sold to
            organisations. It is not directed at children and we do not
            knowingly collect information about them. If you believe a child
            has sent us something, tell us and we will delete it.
          </p>

          <h2 id='links'>Links to other sites</h2>
          <p>
            We link to our social media pages, to other Pixelette Group
            companies and to sources we cite. Those sites have their own privacy
            practices and this statement does not extend to them.
          </p>

          <h2 id='changes'>Changes to this statement</h2>
          <p>
            We review this statement when what we do with personal information
            changes, and at least once a year. The effective date and version
            are at the top of this page. Where a change materially affects you
            we will say so, rather than leaving you to notice a new date.
          </p>

          <h2 id='contact'>Contact</h2>
          <p>
            Pixelette Marketing
            <br />
            77 Fulham Palace Road, London W6 8JA
            <br />
            Registered in England and Wales, company number 11716825
            <br />
            <Mail />
          </p>
          <p>
            We have not appointed a statutory data protection officer, because
            we are not required to. Privacy questions go to the address above
            and are answered by a person.
          </p>
        </article>
      </Container>
    </>
  );
}
