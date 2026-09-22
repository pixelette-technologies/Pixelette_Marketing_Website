import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { DIAGNOSTIC_ANCHOR, diagnosticIntro } from "@/data/strategy";
import StrategyDiagnostic from "./StrategyDiagnostic";

// The diagnostic's section shell, and it is a SERVER component on purpose.
//
// THE HEADING AND THE STANDFIRST ARE IN THE HTML WHATEVER THE CLIENT DOES.
// The brief is explicit that the page must not be a client-only component that
// leaves a crawler with nothing, and the instrument is necessarily client-side
// — it holds twelve answers and a score. Splitting the section in two is what
// resolves that: this file renders the section, its real <h2>, the visual
// heading and the standfirst, and only the panel inside it hydrates.
//
// It also means the section reads correctly for the half-second before
// hydration and for anybody who never gets it, rather than showing an empty
// box where the diagnostic should be.

const DiagnosticSection = () => {
  const { eyebrow, heading, lead } = diagnosticIntro;

  return (
    <Container className='main'>
      <section className='diagnostic' id={DIAGNOSTIC_ANCHOR}>
        <header>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='lead'>{lead}</Text>
        </header>

        <StrategyDiagnostic />
      </section>
    </Container>
  );
};

export default DiagnosticSection;
