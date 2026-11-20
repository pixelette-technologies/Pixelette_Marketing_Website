import { Container } from "@/components/common";
import { capabilitiesCopy, capabilityBandCopy } from "@/data/home";
import { capabilityGroups } from "@/data/services/capabilityGroups";
import { capabilityStages } from "@/data/services/capabilityStage";
import CapabilityBand from "./CapabilityBand";
import EditorialCopy from "./EditorialCopy";

// 03 — Five capabilities as alternating editorial bands.
// Replaces the single maquette + stacked name list with one visual row per
// capability (Social Change–style image/copy split). Hero, nav and footer
// are untouched. Copy is composed from existing cadence, scope and lead only.

export default function CapabilitiesSection() {
  const bands = capabilityBandCopy.map((band, index) => {
    const group = capabilityGroups.find(item => item.index === band.index);
    const stage = capabilityStages.find(item => item.index === band.index);
    if (!group || !stage) {
      throw new Error(
        `Homepage capability band ${band.index} is missing group or stage media.`
      );
    }
    return {
      ...band,
      title: group.title,
      stage,
      imageOnLeft: index % 2 === 0
    };
  });

  return (
    <section className='capabilityBands' aria-labelledby='capabilities-title'>
      <header className='capabilityBands__intro sec'>
        <Container className='main'>
          <EditorialCopy
            copy={capabilitiesCopy}
            titleId='capabilities-title'
          />
        </Container>
      </header>

      {bands.map(band => (
        <CapabilityBand
          key={band.index}
          title={band.title}
          description={band.description}
          href={band.href}
          ctaLabel={band.ctaLabel}
          stage={band.stage}
          imageOnLeft={band.imageOnLeft}
        />
      ))}
    </section>
  );
}
