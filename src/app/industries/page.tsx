import { IndustriesHero, Web3Questions } from "@/components/ui/industries";
import {
  ContactSection,
  QuestionAndAnswer,
  TeamSection
} from "@/components/common";
import { ourProcessData } from "@/data";

export default function Industries() {
  return (
    <>
      <IndustriesHero />
      <Web3Questions />
      <ContactSection
        heading={`our <span> process <span/>`}
        data={ourProcessData}
      />
      <TeamSection />
      <QuestionAndAnswer
        heading={`Web3 is moving fast. <span> Are you? <span/>`}
        text='Stop waiting for success to find you. With the right marketing, your new crypto, web3 project can dominate the conversation.'
      />
    </>
  );
}
