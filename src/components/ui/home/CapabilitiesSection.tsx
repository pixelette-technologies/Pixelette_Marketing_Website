import { Container } from "@/components/common";
import { capabilitiesCopy } from "@/data/home";
import EditorialCopy from "./EditorialCopy";
import MaquetteScene, { SCENE } from "./MaquetteScene";
import MaquetteSceneMotion from "./MaquetteSceneMotion";
import RoomBackdrop from "./RoomBackdrop";

// 03 — "Five capabilities / One commercial objective".
// Layered transparent cutouts (Option 1) replace the schematic SVG maquette.
// Section shell, copy, CTA, room backdrop and layout are unchanged.
// First view: layered fade-in (forms → props → people). Then desktop hover
// runs a coordinated one-shot sequence; touch plays once after the entrance;
// reduced motion shows the settled pose. Decorative (aria-hidden).

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
