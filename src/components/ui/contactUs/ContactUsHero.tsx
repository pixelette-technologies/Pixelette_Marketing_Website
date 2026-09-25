import { ContactSection } from "@/components/common";
import { finalConversionCopy } from "@/data/home";

// The /contactus opening. Rewritten 25 Sep 2026 to the final correction pass.
//
// IT WAS "Stop watching others win and start your success story now", over
// "Book an intro call with us, free of charge" and four promises, one of them
// "a first-hand look at how we deliver scalable, impactful strategies". The
// free call is not confirmed by anyone and the rest was the legacy agency
// register the site has otherwise left.
//
// The heading is the form's own heading, so the form's intro is switched off
// here; otherwise the page would print "Tell us what needs to grow." twice,
// side by side. The closing line is the home page's, which is the same promise.
//
// ONLY /contactus RENDERS THIS NOW. Blog posts used it as their closing
// section too; they take the /results close instead, since an h2 reading
// "Start here" at the foot of an article is the wrong claim.
const ContactUsHero = () => {
  return (
    <ContactSection
      eyebrow='Start here'
      heading='Tell us what needs to grow.'
      text='Give us enough context to make the first conversation useful. We will review the enquiry, understand what is limiting growth and come back with the most relevant next step.'
      closing={finalConversionCopy.closing}
      headingLevel={1}
      formIntro={false}
    />
  );
};

export default ContactUsHero;
