import { Container } from "@/components/common";
import { capabilitiesCopy } from "@/data/home";
import EditorialCopy from "./EditorialCopy";
import MaquetteScene, { SCENE } from "./MaquetteScene";
import MaquetteSceneMotion from "./MaquetteSceneMotion";
import RoomBackdrop from "./RoomBackdrop";

// 03 — "Five capabilities / One commercial objective".
// Premium architectural-maquette SVG replaces the former brick / Lego visual.
// Section shell, copy, CTA, room backdrop and layout are unchanged.
// Interaction: desktop hover activates a coordinated one-shot sequence;
// touch plays once on viewport entry; reduced motion shows the settled pose.
// The illustration is decorative (aria-hidden); meaning lives in the copy.

export default function CapabilitiesSection() {
  return (
    <section
      className='homeScene homeScene--capabilities'
      aria-labelledby='capabilities-title'
    >
      <div className='homeScene__art'>
        <RoomBackdrop id='maquetteRoom' />
        <div className='maquetteScene'>
          <MaquetteSceneMotion
            className='maquetteScene__frame'
            style={{ aspectRatio: `${SCENE.w} / ${SCENE.h}` }}
          >
            <MaquetteScene />
          </MaquetteSceneMotion>
        </div>
      </div>

      <div className='homeScene__body'>
        <Container className='main'>
          <div className='homeScene__inner'>
            <EditorialCopy
              copy={capabilitiesCopy}
              titleId='capabilities-title'
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
