import type { CSSProperties } from "react";
import {
  TbChartArrowsVertical,
  TbChartBar,
  TbCompass,
  TbFilter,
  TbMoodSmile,
  TbSearch
} from "react-icons/tb";
import { Container } from "@/components/common";
import { capabilitiesCopy, type CapabilityIcon } from "@/data/home";
import BrickScene, { BASE, BRICK, BRICKS, SCENE } from "./BrickScene";
import BrickSceneMotion from "./BrickSceneMotion";
import EditorialCopy from "./EditorialCopy";
import RoomBackdrop from "./RoomBackdrop";

// 03 — "Five capabilities / One commercial objective". Locked implementation
// specification, 28 Sep 2026. THE CALM SECTION: deliberate visual rest
// between the falling notes above and the ducks below. A capability brick
// lifts a few pixels under the pointer (spec §21). 29 Sep, on instruction:
// the two ladder builders climb in once on arrival and a rung higher under
// the pointer, and the builders on top jump when hovered.
//
// The section is a server component; only the frame's climb is a client
// wrapper (BrickSceneMotion) around server-rendered children. The five
// capabilities are a real
// ordered list laid over the drawn bricks, so the section's meaning is text
// and never depends on the picture.

const ICONS: Record<CapabilityIcon, typeof TbCompass> = {
  compass: TbCompass,
  bars: TbChartBar,
  search: TbSearch,
  funnel: TbFilter,
  rise: TbChartArrowsVertical
};

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export default function CapabilitiesSection() {
  const { capabilities, payoff } = capabilitiesCopy;

  return (
    <section
      className='homeScene homeScene--capabilities'
      aria-labelledby='capabilities-title'
    >
      <div className='homeScene__art'>
        <RoomBackdrop id='brickRoom' />
        <div className='brickScene'>
          <BrickSceneMotion
            className='brickScene__frame'
            style={{ aspectRatio: `${SCENE.w} / ${SCENE.h}` }}
          >
            <BrickScene />

            <ol className='brickScene__labels'>
              {capabilities.map((cap, i) => {
                const Icon = ICONS[cap.icon];
                const brick = BRICKS[i];
                return (
                  <li
                    key={cap.name}
                    className={`brickScene__label brickScene__label--${i + 1} brickScene__label--${brick.ink}`}
                    style={
                      {
                        left: pct(brick.x, SCENE.w),
                        top: pct(BRICK.face, SCENE.h),
                        width: pct(BRICK.w - 1, SCENE.w),
                        height: pct(BRICK.bottom - BRICK.face, SCENE.h)
                      } as CSSProperties
                    }
                  >
                    <span className='brickScene__name'>{cap.name}</span>
                    <Icon className='brickScene__icon' aria-hidden='true' />
                  </li>
                );
              })}
            </ol>

            <p
              className='brickScene__payoff'
              style={{
                left: pct(BASE.x, SCENE.w),
                top: pct(BASE.face, SCENE.h),
                width: pct(BASE.w, SCENE.w),
                height: pct(BASE.bottom - BASE.face, SCENE.h)
              }}
            >
              {/* The reference underlines the last word only. */}
              <span>
                {payoff.slice(0, payoff.lastIndexOf(" ") + 1)}
                <u>{payoff.slice(payoff.lastIndexOf(" ") + 1)}</u>
              </span>
              <TbMoodSmile className='brickScene__smile' aria-hidden='true' />
            </p>
          </BrickSceneMotion>
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
