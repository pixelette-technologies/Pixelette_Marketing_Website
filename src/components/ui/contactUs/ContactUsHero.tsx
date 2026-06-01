import { ContactSection } from "@/components/common";
import { successStoryData } from "@/data/contactUs";

const ContactUsHero = ({ asPageTitle = false }: { asPageTitle?: boolean }) => {
  return (
    <div>
      <ContactSection
        heading={`Stop watching others win and start your success story <span> NOW </span>`}
        text='Book an intro call with us, free of any charge, so that you can'
        data={successStoryData}
        headingLevel={asPageTitle ? 1 : 2}
      />
    </div>
  );
};

export default ContactUsHero;
