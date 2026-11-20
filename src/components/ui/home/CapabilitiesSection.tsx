import { Container } from "@/components/common";
import { capabilitiesCopy } from "@/data/home";
import EditorialCopy from "./EditorialCopy";
import HomeSceneReveal from "./HomeSceneReveal";
import MaquetteScene, { SCENE } from "./MaquetteScene";
import MaquetteSceneMotion from "./MaquetteSceneMotion";
import RoomBackdrop from "./RoomBackdrop";

// 03 — "Five capabilities / Built around your objective".
// Original homepage maquette + name list, presented as a rectangular
// image/copy band (visual left, copy right). No What We Do stage media.

export default function CapabilitiesSection() {
  return (
    <HomeSceneReveal
      className='homeScene homeScene--capabilities homeScene--flip'
      labelledBy='capabilities-title'
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
            <div className='homeScene__copyStack'>
              <EditorialCopy
                copy={capabilitiesCopy}
                titleId='capabilities-title'
              />
              <ul className='capabilitiesNames'>
                {capabilitiesCopy.capabilities.map(capability => (
                  <li key={capability.name}>
                    <span className='capabilitiesNames__name'>
                      {capability.name}
                    </span>
                    <span className='capabilitiesNames__cadence'>
                      {capability.cadence}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </HomeSceneReveal>
  );
}
