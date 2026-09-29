import type { CSSProperties, ReactNode } from "react";

// 03 — THE BRICK SCENE, drawn. Locked implementation specification, 28 Sep
// 2026: "different capabilities being built together".
//
// A VECTOR RENDERING of the supplied reference photograph (29 Sep), drawn as
// close to it as SVG allows: five tall capability bricks in a row on a
// studded white base, a ladder at each end, five builders in the reference's
// poses and colours, loose bricks on the floor and a soft floor reflection.
// The figures are generic, with no maker's mark.
//
// NO TEXT IS DRAWN HERE. The capability names and icons, and "Real growth
// builds here", are HTML laid over this drawing by CapabilitiesSection, so
// they stay real, selectable, translatable text.
//
// COORDINATES ARE THE REFERENCE IMAGE'S OWN PIXELS (1085 x 362), so a
// position can be checked against the photograph directly. BRICKS, BRICK and
// BASE are also what the HTML labels are positioned from, so the two cannot
// drift apart.
//
// A server component: nothing here runs in the browser. The hover responses
// (a brick lifting, a builder jumping or climbing a rung) are CSS; the one
// scripted moment, the two ladder builders climbing in when the section
// arrives, is BrickSceneMotion, which only reads the data this file writes.
//
// COLOUR, 29 Sep, on instruction: the bricks and the shirts are the Living
// Signal's five colours, in the signal's own order left to right (deep blue,
// blue, violet, magenta, orange), so 01 and 03 read as one palette.

export const SCENE = { w: 1085, h: 362 };

type Colour = "deep" | "blue" | "violet" | "magenta" | "orange";

/** The five capability bricks, left to right, in the section's order. `ink`
 *  is the label colour that reads on the face: light on the two darkest. */
export const BRICKS: { x: number; colour: Colour; ink: "dark" | "light" }[] = [
  { x: 180, colour: "deep", ink: "light" },
  { x: 325, colour: "blue", ink: "dark" },
  { x: 470, colour: "violet", ink: "light" },
  { x: 615, colour: "magenta", ink: "dark" },
  { x: 760, colour: "orange", ink: "dark" }
];
/** top: the top strip starts; face: the front face starts; bottom: its foot. */
export const BRICK = { w: 145, top: 104, face: 114, bottom: 236 };
export const BASE = { x: 166, w: 754, top: 232, face: 246, bottom: 296 };

const colourVars = (colour: Colour | "base") =>
  ({
    "--b": `var(--brick-${colour})`,
    "--b-top": `var(--brick-${colour}-top)`,
    "--b-side": `var(--brick-${colour}-side)`
  }) as CSSProperties;

// --- Pieces ----------------------------------------------------------------------

/** A stud: a short moulded cylinder standing on a surface at `y`, its side
 *  shaded round, its top lit, a glint on the near edge. */
function Stud({
  cx,
  y,
  r,
  h
}: {
  cx: number;
  y: number;
  r: number;
  h: number;
}) {
  const ry = r * 0.36;
  return (
    <g>
      <ellipse className='brick__side' cx={cx} cy={y} rx={r} ry={ry} />
      <rect
        className='brick__side'
        x={cx - r}
        y={y - h}
        width={r * 2}
        height={h}
      />
      <rect
        x={cx - r}
        y={y - h}
        width={r * 2}
        height={h}
        fill='url(#brickSceneStudShade)'
      />
      <ellipse className='brick__top' cx={cx} cy={y - h} rx={r} ry={ry} />
      <ellipse
        className='brick__glint'
        cx={cx - r * 0.28}
        cy={y - h - ry * 0.1}
        rx={r * 0.5}
        ry={ry * 0.42}
      />
    </g>
  );
}

/** A brick seen from the front and a little above: a lit top strip carrying
 *  its studs, a glossy face, a darker right edge and foot. */
function Brick({
  x,
  y,
  w,
  h,
  studs,
  colour,
  topH = Math.max(6, h * 0.14),
  studR,
  className = ""
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  studs: number;
  colour: Colour | "base";
  topH?: number;
  studR?: number;
  className?: string;
}) {
  const pitch = studs ? w / studs : 0;
  const r = studR ?? Math.min(12, pitch * 0.31);
  const faceY = y + topH;
  return (
    <g className={`brick ${className}`} style={colourVars(colour)}>
      <rect
        className='brick__top'
        x={x}
        y={y}
        width={w}
        height={topH + 2}
        rx={2.5}
      />
      {Array.from({ length: studs }, (_, i) => (
        <Stud
          key={i}
          cx={x + pitch * (i + 0.5)}
          y={y + topH * 0.62}
          r={r}
          h={r * 0.72}
        />
      ))}
      <rect
        className='brick__face'
        x={x}
        y={faceY}
        width={w}
        height={h - topH}
        rx={2.5}
      />
      <rect
        x={x}
        y={faceY}
        width={w}
        height={h - topH}
        rx={2.5}
        fill='url(#brickSceneSheen)'
      />
      <rect
        className='brick__edgeLight'
        x={x + 1.5}
        y={faceY}
        width={w - 3}
        height={1.6}
      />
      <rect
        className='brick__side'
        x={x + w - 4}
        y={faceY}
        width={4}
        height={h - topH}
        opacity={0.55}
      />
      <rect
        className='brick__side'
        x={x}
        y={y + h - 3}
        width={w}
        height={3}
        opacity={0.5}
      />
    </g>
  );
}

// --- The builders ---------------------------------------------------------------------

type Hair = "short" | "long" | "swept" | "afro";
type Arm = [number, number, number, number]; // elbow x, y, hand x, y

interface Carry {
  colour: Colour;
  x: number;
  y: number;
  w: number;
  h: number;
  studs: number;
  rot?: number;
}

const HAIR: Record<Hair, string> = {
  short:
    "M-9.2 -49 C -10.6 -58.5 -5 -62.8 0.5 -62.8 C 6.6 -62.8 10.6 -58.6 9.4 -49 C 8.4 -52.6 6 -54.6 3 -55 C 0 -53.2 -4 -53.6 -7 -55.6 C -8.2 -53.6 -8.8 -51.6 -9.2 -49 Z",
  swept:
    "M-9.2 -49 C -10.8 -59 -6 -64.5 1 -64 C 5 -66 11.5 -62 9.4 -49 C 8.4 -52.6 6.4 -54.8 3.4 -55.4 C -1 -55.8 -5 -54.8 -7.4 -53.4 C -8.4 -52.2 -8.9 -50.8 -9.2 -49 Z",
  long: "M-9.6 -48 C -11 -58.8 -5 -63.2 0.5 -63.2 C 7 -63.2 11 -58.8 9.8 -48 L 10.8 -37.6 C 9.2 -36.6 7.6 -37 6.6 -38.2 L 7.4 -50.4 C 5 -53.6 1 -55.2 -3 -54.2 C -5.6 -53.2 -7 -51.6 -7.4 -49.6 L -6.6 -38.2 C -7.6 -37 -9.2 -36.6 -10.8 -37.6 Z",
  // The hairline of a full afro; its volume is HAIR_BACK, behind the head.
  afro: "M-8.8 -50.5 C -9.6 -58 -5.4 -61.5 0 -61.5 C 5.4 -61.5 9.6 -58 8.8 -50.5 C 6.6 -54.2 3.6 -55.6 0 -55.6 C -3.6 -55.6 -6.6 -54.2 -8.8 -50.5 Z"
};

/** Hair that sits behind the head, and behind anything carried overhead. */
const HAIR_BACK: Partial<Record<Hair, string>> = {
  afro: "M-14.2 -54.5 a14.2 11.6 0 1 1 28.4 0 a14.2 11.6 0 1 1 -28.4 0 Z"
};

/** A generic builder figure, feet at (x, y), drawn at a 58-unit height and
 *  scaled to the reference (about 84px). Faces right; `flip` faces left. */
function Figure({
  x,
  y,
  shirt,
  legs,
  hair,
  hairTone,
  skin = "var(--figure-skin)",
  woman,
  left,
  right,
  carry,
  flip,
  s = 1.45
}: {
  x: number;
  y: number;
  shirt: string;
  legs: string;
  hair: Hair;
  hairTone: string;
  skin?: string;
  /** Lashes and coloured lips. */
  woman?: boolean;
  left: Arm;
  right: Arm;
  carry?: Carry;
  flip?: boolean;
  s?: number;
}) {
  const arm = ([ex, ey, hx, hy]: Arm, side: number) =>
    `M${side * 8.6} -37 Q${ex} ${ey} ${hx} ${hy}`;
  return (
    <g
      className='figure'
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      style={
        {
          "--shirt": shirt,
          "--legs": legs,
          "--hair": hairTone,
          "--skin": skin
        } as CSSProperties
      }
    >
      {/* legs, hips and feet */}
      <rect
        className='figure__legs'
        x={-10}
        y={-18.5}
        width={9.6}
        height={18.5}
        rx={1.4}
      />
      <rect
        className='figure__legs'
        x={0.4}
        y={-18.5}
        width={9.6}
        height={18.5}
        rx={1.4}
      />
      <rect
        x={-10}
        y={-18.5}
        width={20}
        height={18.5}
        fill='url(#brickSceneSheen)'
      />
      <rect
        className='figure__legs'
        x={-10.6}
        y={-23}
        width={21.2}
        height={5.4}
        rx={1.2}
      />
      <rect
        className='figure__seam'
        x={-0.4}
        y={-17.5}
        width={0.8}
        height={17}
      />

      {/* torso */}
      <path
        className='figure__shirt'
        d='M-8.6 -41.5 L8.6 -41.5 L11 -22.4 L-11 -22.4 Z'
      />
      <path
        d='M-8.6 -41.5 L8.6 -41.5 L11 -22.4 L-11 -22.4 Z'
        fill='url(#brickSceneSheen)'
      />
      <path className='figure__collar' d='M-3.6 -41.4 L0 -37.2 L3.6 -41.4' />

      {HAIR_BACK[hair] && (
        <path className='figure__hair' d={HAIR_BACK[hair]} />
      )}

      {/* arms behind whatever they carry, hands in front of it */}
      <path className='figure__arm' d={arm(left, -1)} />
      <path className='figure__arm' d={arm(right, 1)} />
      {carry && (
        <g
          transform={`rotate(${carry.rot ?? 0} ${carry.x + carry.w / 2} ${carry.y + carry.h / 2})`}
        >
          <Brick
            x={carry.x}
            y={carry.y}
            w={carry.w}
            h={carry.h}
            studs={carry.studs}
            colour={carry.colour}
            topH={carry.h * 0.26}
          />
        </g>
      )}
      <path className='figure__hand' d={hand(left[2], left[3])} />
      <path className='figure__hand' d={hand(right[2], right[3])} />

      {/* neck and head */}
      <rect
        className='figure__skin'
        x={-3.2}
        y={-44.4}
        width={6.4}
        height={3.6}
      />
      <rect
        className='figure__skin'
        x={-8.6}
        y={-58}
        width={17.2}
        height={14.4}
        rx={5}
      />
      <rect
        x={-8.6}
        y={-58}
        width={17.2}
        height={14.4}
        rx={5}
        fill='url(#brickSceneSheen)'
      />
      <path
        className='figure__brow'
        d='M-5 -53.6 L-2 -54.2 M2 -54.2 L5 -53.6'
      />
      <ellipse className='figure__eye' cx={-3.1} cy={-51.2} rx={1} ry={1.35} />
      <ellipse className='figure__eye' cx={3.1} cy={-51.2} rx={1} ry={1.35} />
      <circle className='figure__eyeGlint' cx={-2.8} cy={-51.7} r={0.35} />
      <circle className='figure__eyeGlint' cx={3.4} cy={-51.7} r={0.35} />
      {woman ? (
        <>
          <path
            className='figure__brow'
            d='M-4.1 -51.9 L-5 -53 M4.1 -51.9 L5 -53'
          />
          <path
            className='figure__lips'
            d='M-3 -47.8 Q0 -48.6 3 -47.8 Q0 -44.8 -3 -47.8 Z'
          />
        </>
      ) : (
        <path className='figure__smile' d='M-3.4 -47.8 Q0 -45.2 3.4 -47.8' />
      )}

      {/* hair piece */}
      <path className='figure__hair' d={HAIR[hair]} />
      <path className='figure__hairGlint' d='M-5.5 -60 Q-1 -62.2 4 -60.6' />
    </g>
  );
}

/** The hand: a round grip. At this size the C-shaped opening read as a ring,
 *  a hole in a yellow disc, so it is drawn solid. */
function hand(x: number, y: number) {
  return `M${x - 3.4} ${y} a3.4 3.4 0 1 1 6.8 0 a3.4 3.4 0 1 1 -6.8 0 Z`;
}

function Ladder({
  x1,
  y1,
  x2,
  y2,
  rungs
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  rungs: number;
}) {
  // Two rails from the foot (x1, y1) to the top (x2, y2), 34 apart.
  const off = 17;
  return (
    <g className='ladder'>
      {Array.from({ length: rungs }, (_, i) => {
        const t = (i + 0.55) / rungs;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        return (
          <line
            key={i}
            className='ladder__rung'
            x1={x - off}
            y1={y}
            x2={x + off}
            y2={y}
          />
        );
      })}
      <line
        className='ladder__rail'
        x1={x1 - off}
        y1={y1}
        x2={x2 - off}
        y2={y2}
      />
      <line
        className='ladder__rail'
        x1={x1 + off}
        y1={y1}
        x2={x2 + off}
        y2={y2}
      />
      <line
        className='ladder__glint'
        x1={x1 - off - 1.5}
        y1={y1}
        x2={x2 - off - 1.5}
        y2={y2}
      />
      <line
        className='ladder__glint'
        x1={x1 + off - 1.5}
        y1={y1}
        x2={x2 + off - 1.5}
        y2={y2}
      />
    </g>
  );
}

// --- The crew's motion ----------------------------------------------------------------
// Every builder sits in two groups: an outer one that never moves and carries a
// still, invisible hit area (so a builder moving under the pointer cannot
// un-hover itself), and an inner body that moves. Hover is CSS
// (_capabilitiesSection.scss); the arrival climb is BrickSceneMotion.

interface LadderSpec {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  rungs: number;
}

// Left against the deep-blue brick, right against the orange.
const LADDERS: { left: LadderSpec; right: LadderSpec } = {
  left: { x1: 112, y1: 296, x2: 176, y2: 110, rungs: 7 },
  right: { x1: 1004, y1: 296, x2: 926, y2: 92, rungs: 8 }
};

/** A builder's hit area, feet at (x, y): the body and whatever it holds. */
const HIT = { w: 44, h: 128 };

/** A builder on a ladder. It climbs one rung under the pointer; on arrival it
 *  climbs in from the ladder's foot to where it stands in the reference. */
function Climber({
  ladder,
  x,
  y,
  children
}: {
  ladder: LadderSpec;
  x: number;
  y: number;
  children: ReactNode;
}) {
  const stepX = (ladder.x2 - ladder.x1) / ladder.rungs;
  const stepY = (ladder.y2 - ladder.y1) / ladder.rungs;
  // How many rungs up the ladder this builder stands.
  const steps = (ladder.y1 - y) / -stepY;
  const px = (n: number) => `${n.toFixed(2)}px`;
  return (
    <g
      className='crew crew--climb'
      data-steps={steps.toFixed(3)}
      data-foot={`${(-steps * stepX).toFixed(2)} ${(-steps * stepY).toFixed(2)}`}
      style={
        {
          "--rung-x": px(stepX),
          "--rung-y": px(stepY)
        } as CSSProperties
      }
    >
      <rect
        className='crew__hit'
        x={x - HIT.w / 2}
        y={y - HIT.h + stepY}
        width={HIT.w}
        height={HIT.h - stepY}
      />
      <g className='crew__body'>{children}</g>
    </g>
  );
}

/** A builder standing on the top of the bricks. It jumps under the pointer. */
function Jumper({
  x,
  y,
  children
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <g className='crew crew--jump'>
      <rect
        className='crew__hit'
        x={x - HIT.w / 2}
        y={y - HIT.h}
        width={HIT.w}
        height={HIT.h}
      />
      <g className='crew__body'>{children}</g>
    </g>
  );
}

// --- The scene --------------------------------------------------------------------

export default function BrickScene() {
  const baseStuds = 24;
  return (
    <svg
      className='brickScene__svg'
      viewBox={`0 0 ${SCENE.w} ${SCENE.h}`}
      focusable='false'
      aria-hidden='true'
    >
      <defs>
        {/* One sheen for every moulded surface: lit at the top, a clean
            middle, a little shade at the foot. */}
        <linearGradient id='brickSceneSheen' x1='0' y1='0' x2='0.18' y2='1'>
          <stop offset='0' className='sheen__stop--light' stopOpacity='0.5' />
          <stop
            offset='0.28'
            className='sheen__stop--light'
            stopOpacity='0.06'
          />
          <stop offset='0.78' className='sheen__stop--dark' stopOpacity='0' />
          <stop offset='1' className='sheen__stop--dark' stopOpacity='0.16' />
        </linearGradient>
        {/* A stud's side is a cylinder: dark at both edges, lit off-centre. */}
        <linearGradient id='brickSceneStudShade' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0' className='sheen__stop--dark' stopOpacity='0.22' />
          <stop
            offset='0.32'
            className='sheen__stop--light'
            stopOpacity='0.4'
          />
          <stop offset='0.62' className='sheen__stop--light' stopOpacity='0' />
          <stop offset='1' className='sheen__stop--dark' stopOpacity='0.28' />
        </linearGradient>
        <radialGradient id='brickSceneShadow' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0' className='sheen__stop--dark' stopOpacity='0.26' />
          <stop offset='1' className='sheen__stop--dark' stopOpacity='0' />
        </radialGradient>
        {/* The floor reflection fades out below the base. */}
        <linearGradient id='brickSceneFadeRamp' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' className='sheen__stop--light' stopOpacity='0.5' />
          <stop offset='1' className='sheen__stop--light' stopOpacity='0' />
        </linearGradient>
        <mask id='brickSceneFade' maskUnits='userSpaceOnUse'>
          <rect
            x={0}
            y={BASE.bottom}
            width={SCENE.w}
            height={SCENE.h - BASE.bottom}
            fill='url(#brickSceneFadeRamp)'
          />
        </mask>
      </defs>

      {/* Contact shadow under the whole build. */}
      <ellipse
        cx={543}
        cy={BASE.bottom + 1}
        rx={420}
        ry={11}
        fill='url(#brickSceneShadow)'
      />

      {/* The five capability bricks. Each is its own group so it can lift. */}
      {BRICKS.map((b, i) => (
        <g
          key={b.colour}
          className={`brickScene__cap brickScene__cap--${i + 1}`}
        >
          <Brick
            x={b.x}
            y={BRICK.top}
            w={BRICK.w - 1}
            h={BRICK.bottom - BRICK.top}
            studs={4}
            colour={b.colour}
            topH={BRICK.face - BRICK.top}
            studR={11.5}
          />
        </g>
      ))}

      {/* The white base, in front of the bricks' feet: a studded top strip
          and a face of five wide bricks. Grouped so it can be reflected. */}
      <g id='brickSceneBaseSet'>
        <Brick
          x={BASE.x}
          y={BASE.top}
          w={BASE.w}
          h={BASE.face - BASE.top + 2}
          studs={baseStuds}
          colour='base'
          topH={BASE.face - BASE.top}
          studR={9}
        />
        {[0, 1, 2, 3, 4].map(i => (
          <Brick
            key={i}
            x={BASE.x + (BASE.w / 5) * i}
            y={BASE.face}
            w={BASE.w / 5 - 1.5}
            h={BASE.bottom - BASE.face}
            studs={0}
            colour='base'
            topH={2}
          />
        ))}
      </g>
      <use
        href='#brickSceneBaseSet'
        transform={`translate(0 ${BASE.bottom * 2}) scale(1 -1)`}
        mask='url(#brickSceneFade)'
        opacity={0.5}
      />

      <Ladder {...LADDERS.left} />
      <Ladder {...LADDERS.right} />

      {/* The builders, left to right, as the reference poses them. Each shirt
          is a signal colour other than the brick it holds, so the two never
          merge. */}
      <Climber ladder={LADDERS.left} x={146} y={192}>
        <Figure
          x={146}
          y={192}
          shirt='var(--signal-deep)'
          legs='var(--figure-slate)'
          hair='short'
          hairTone='var(--figure-hair)'
          left={[8, -46, 21, -55]}
          right={[17, -40, 27, -50]}
        />
      </Climber>
      <Jumper x={362} y={102}>
        <Figure
          x={362}
          y={102}
          shirt='var(--signal-magenta)'
          legs='var(--figure-slate)'
          hair='long'
          hairTone='var(--figure-auburn)'
          woman
          left={[-13, -28, -3, -28]}
          right={[15, -27, 27, -28]}
          carry={{ colour: "blue", x: -5, y: -35, w: 35, h: 15, studs: 4 }}
        />
      </Jumper>
      <Jumper x={552} y={102}>
        <Figure
          x={552}
          y={102}
          shirt='var(--signal-orange)'
          legs='var(--figure-slate)'
          hair='swept'
          hairTone='var(--figure-hair)'
          left={[-14, -50, -4, -66]}
          right={[17, -52, 18, -70]}
          carry={{
            colour: "violet",
            x: -6,
            y: -86,
            w: 28,
            h: 21,
            studs: 2,
            rot: -14
          }}
          flip
        />
      </Jumper>
      {/* 29 Sep, on instruction: an Asian woman with brown skin. */}
      <Jumper x={708} y={102}>
        <Figure
          x={708}
          y={102}
          shirt='var(--signal-violet)'
          legs='var(--figure-slate)'
          hair='long'
          hairTone='var(--figure-hair)'
          skin='var(--figure-skin-brown)'
          woman
          left={[0, -30, 12, -27]}
          right={[19, -33, 30, -29]}
          carry={{ colour: "magenta", x: 9, y: -34, w: 38, h: 15, studs: 4 }}
          flip
        />
      </Jumper>
      {/* 29 Sep, on instruction: a Black woman. */}
      <Climber ladder={LADDERS.right} x={956} y={180}>
        <Figure
          x={956}
          y={180}
          shirt='var(--signal-blue)'
          legs='var(--figure-slate)'
          hair='afro'
          hairTone='var(--figure-hair)'
          skin='var(--figure-skin-deep)'
          woman
          left={[0, -49, 6, -62]}
          right={[18, -51, 26, -70]}
          carry={{
            colour: "orange",
            x: 2,
            y: -84,
            w: 48,
            h: 21,
            studs: 4,
            rot: 14
          }}
          flip
        />
      </Climber>

      {/* Loose bricks on the floor, as the reference scatters them. */}
      <ellipse cx={90} cy={318} rx={120} ry={8} fill='url(#brickSceneShadow)' />
      <ellipse
        cx={965}
        cy={318}
        rx={130}
        ry={8}
        fill='url(#brickSceneShadow)'
      />
      <Brick x={-24} y={226} w={82} h={26} studs={4} colour='orange' />
      <Brick x={28} y={234} w={64} h={32} studs={2} colour='blue' />
      <Brick x={22} y={270} w={116} h={46} studs={4} colour='magenta' />
      <Brick x={136} y={292} w={108} h={44} studs={4} colour='violet' />
      <Brick x={985} y={222} w={100} h={30} studs={4} colour='deep' />
      <Brick x={925} y={262} w={92} h={38} studs={3} colour='orange' />
      <Brick x={1008} y={270} w={80} h={46} studs={2} colour='blue' />
      <Brick x={842} y={288} w={108} h={44} studs={4} colour='magenta' />
    </svg>
  );
}
