import type { CSSProperties, ReactNode } from "react";

// 03 — Architectural maquette scene. Replaces the former brick / Lego visual.
// Premium plaster and paperboard forms with six editorial miniature figures.
// Interactive groups are animated by MaquetteSceneMotion + SCSS transforms.
// Decorative only (aria-hidden on the SVG).

export const SCENE = { w: 1100, h: 430 };

const UID = "maquette";

type Skin = "light" | "warm" | "brown" | "deep";

const skinVar = (tone: Skin) => `var(--figure-skin-${tone})`;

/** Soft elliptical ground shadow under a form. */
function GroundShadow({
  cx,
  cy,
  rx,
  ry = 10,
  opacity = 0.22
}: {
  cx: number;
  cy: number;
  rx: number;
  ry?: number;
  opacity?: number;
}) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={`url(#${UID}FloorShadow)`}
      opacity={opacity}
    />
  );
}

/** Low cylinder: side band + lit elliptical top. */
function Cylinder({
  cx,
  top,
  h,
  rx,
  face,
  lit,
  shade,
  className = ""
}: {
  cx: number;
  top: number;
  h: number;
  rx: number;
  face: string;
  lit: string;
  shade: string;
  className?: string;
}) {
  const ry = rx * 0.28;
  const bottom = top + h;
  return (
    <g className={className}>
      <GroundShadow cx={cx} cy={bottom + 6} rx={rx * 1.05} ry={ry * 1.1} />
      <ellipse cx={cx} cy={bottom} rx={rx} ry={ry} fill={shade} />
      <rect
        x={cx - rx}
        y={top}
        width={rx * 2}
        height={h}
        fill={face}
        filter={`url(#${UID}Grain)`}
      />
      <rect
        x={cx + rx * 0.35}
        y={top}
        width={rx * 0.65}
        height={h}
        fill={shade}
        opacity={0.35}
      />
      <ellipse
        cx={cx}
        cy={top}
        rx={rx}
        ry={ry}
        fill={lit}
        filter={`url(#${UID}Grain)`}
      />
      <ellipse
        cx={cx - rx * 0.25}
        cy={top - ry * 0.15}
        rx={rx * 0.45}
        ry={ry * 0.4}
        fill={`url(#${UID}TopGlint)`}
        opacity={0.55}
      />
    </g>
  );
}

/** Tall rectangular block with shallow perspective top and right edge. */
function TallBlock({
  x,
  y,
  w,
  h,
  depth = 18,
  face,
  lit,
  shade,
  className = ""
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  depth?: number;
  face: string;
  lit: string;
  shade: string;
  className?: string;
}) {
  const top = [
    [x, y],
    [x + w, y],
    [x + w + depth * 0.55, y - depth],
    [x + depth * 0.55, y - depth]
  ] as const;
  const side = [
    [x + w, y],
    [x + w + depth * 0.55, y - depth],
    [x + w + depth * 0.55, y - depth + h],
    [x + w, y + h]
  ] as const;
  const poly = (pts: readonly (readonly [number, number])[]) =>
    pts.map(p => p.join(",")).join(" ");

  return (
    <g className={className}>
      <GroundShadow
        cx={x + w * 0.55}
        cy={y + h + 8}
        rx={w * 0.7}
        ry={9}
        opacity={0.2}
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={face}
        filter={`url(#${UID}Grain)`}
      />
      <polygon points={poly(side)} fill={shade} opacity={0.92} />
      <polygon
        points={poly(top)}
        fill={lit}
        filter={`url(#${UID}Grain)`}
      />
      <line
        x1={x + 4}
        y1={y + 6}
        x2={x + 4}
        y2={y + h - 8}
        stroke={`url(#${UID}TopGlint)`}
        strokeWidth={2}
        opacity={0.35}
      />
    </g>
  );
}

/** Warm brass sphere with soft radial metal. */
function Sphere({
  cx,
  cy,
  r,
  className = ""
}: {
  cx: number;
  cy: number;
  r: number;
  className?: string;
}) {
  return (
    <g className={className}>
      <ellipse
        cx={cx + 2}
        cy={cy + r * 0.85}
        rx={r * 0.85}
        ry={r * 0.22}
        fill={`url(#${UID}FloorShadow)`}
        opacity={0.35}
      />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${UID}Brass)`} />
      <ellipse
        cx={cx - r * 0.28}
        cy={cy - r * 0.32}
        rx={r * 0.38}
        ry={r * 0.28}
        fill={`url(#${UID}BrassGlint)`}
        opacity={0.7}
      />
    </g>
  );
}

function FigureShell({
  id,
  className,
  style,
  children
}: {
  id: string;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <g id={id} className={`maquette__person ${className}`} style={style}>
      {children}
    </g>
  );
}

/** Simplified editorial miniature figure. Featureless face, clear silhouette. */
function Person({
  x,
  y,
  scale = 1,
  skin,
  shirt,
  legs,
  hair,
  hairStyle = "short",
  pose = "stand",
  mirror = false
}: {
  x: number;
  y: number;
  scale?: number;
  skin: Skin;
  shirt: string;
  legs: string;
  hair: string;
  hairStyle?: "short" | "bun" | "crop" | "grey" | "loc";
  pose?: "stand" | "climb" | "lean" | "push" | "point" | "tablet";
  mirror?: boolean;
}) {
  const s = skinVar(skin);
  const flip = mirror ? `translate(${x} ${y}) scale(${-scale} ${scale})` : `translate(${x} ${y}) scale(${scale})`;

  const arm =
    pose === "climb" ? (
      <>
        <path
          d='M-6 -28 C-14 -40 -10 -52 -4 -56'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <path
          d='M6 -28 C14 -38 12 -50 6 -54'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <circle cx={-4} cy={-58} r={3.2} fill={s} />
        <circle cx={6} cy={-56} r={3.2} fill={s} />
      </>
    ) : pose === "point" ? (
      <>
        <path
          d='M-7 -26 C-16 -20 -18 -8 -14 2'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <path
          d='M7 -26 C18 -34 28 -30 34 -22'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <circle cx={-14} cy={3} r={3.2} fill={s} />
        <circle cx={35} cy={-22} r={3.2} fill={s} />
      </>
    ) : pose === "push" ? (
      <>
        <path
          d='M-6 -24 C-20 -18 -28 -8 -32 2'
          fill='none'
          stroke={shirt}
          strokeWidth={5.5}
          strokeLinecap='round'
        />
        <path
          d='M6 -24 C18 -16 26 -6 30 4'
          fill='none'
          stroke={shirt}
          strokeWidth={5.5}
          strokeLinecap='round'
        />
        <circle cx={-33} cy={3} r={3.4} fill={s} />
        <circle cx={31} cy={5} r={3.4} fill={s} />
      </>
    ) : pose === "lean" ? (
      <>
        <path
          d='M-6 -26 C-18 -22 -24 -12 -22 -2'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <path
          d='M6 -26 C16 -30 26 -24 32 -14'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <circle cx={-22} cy={-1} r={3.2} fill={s} />
        <circle cx={33} cy={-14} r={3.2} fill={s} />
      </>
    ) : pose === "tablet" ? (
      <>
        <path
          d='M-6 -26 C-12 -18 -10 -6 -4 2'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <path
          d='M6 -26 C14 -20 16 -10 12 -2'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <rect
          className='maquette__tablet'
          x={-2}
          y={-6}
          width={18}
          height={12}
          rx={1.5}
          fill={legs}
          transform='rotate(-12 7 0)'
        />
        <rect
          x={0}
          y={-4}
          width={14}
          height={8}
          rx={1}
          fill='var(--maquette-cream-lit)'
          transform='rotate(-12 7 0)'
          opacity={0.85}
        />
        <circle cx={-4} cy={3} r={3} fill={s} />
      </>
    ) : (
      <>
        <path
          d='M-6 -26 C-14 -18 -14 -6 -10 2'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <path
          d='M6 -26 C14 -18 14 -6 10 2'
          fill='none'
          stroke={shirt}
          strokeWidth={5}
          strokeLinecap='round'
        />
        <circle cx={-10} cy={3} r={3.2} fill={s} />
        <circle cx={10} cy={3} r={3.2} fill={s} />
      </>
    );

  const hairEl =
    hairStyle === "bun" ? (
      <>
        <ellipse cx={0} cy={-52} rx={9} ry={7.5} fill={hair} />
        <circle cx={8} cy={-58} r={4.5} fill={hair} />
      </>
    ) : hairStyle === "crop" ? (
      <path
        d='M-9 -48 C-10 -58 10 -58 9 -48 C6 -52 -6 -52 -9 -48Z'
        fill={hair}
      />
    ) : hairStyle === "grey" ? (
      <ellipse cx={0} cy={-51} rx={9.5} ry={7} fill={hair} />
    ) : hairStyle === "loc" ? (
      <>
        <ellipse cx={0} cy={-51} rx={9} ry={7.5} fill={hair} />
        <path
          d='M-10 -48 C-14 -40 -12 -32 -10 -28 M10 -48 C14 -40 12 -32 10 -28'
          fill='none'
          stroke={hair}
          strokeWidth={3}
          strokeLinecap='round'
        />
      </>
    ) : (
      <ellipse cx={0} cy={-51.5} rx={9} ry={7.2} fill={hair} />
    );

  const torsoY = pose === "push" ? -18 : -22;
  const legPath =
    pose === "climb"
      ? "M-5 0 C-6 14 -8 28 -6 40 M5 0 C6 14 8 28 6 40"
      : pose === "push"
        ? "M-4 2 C-10 16 -14 28 -12 40 M5 2 C10 16 8 28 6 40"
        : "M-5 2 C-6 16 -7 28 -6 40 M5 2 C6 16 7 28 6 40";

  return (
    <g transform={flip}>
      <path
        d={legPath}
        fill='none'
        stroke={legs}
        strokeWidth={6}
        strokeLinecap='round'
      />
      <ellipse cx={-6} cy={41} rx={5} ry={2.2} fill={legs} opacity={0.9} />
      <ellipse cx={6} cy={41} rx={5} ry={2.2} fill={legs} opacity={0.9} />
      <rect
        x={-9}
        y={torsoY}
        width={18}
        height={28}
        rx={5}
        fill={shirt}
      />
      {arm}
      <circle cx={0} cy={-42} r={9.5} fill={s} />
      {hairEl}
    </g>
  );
}

export default function MaquetteScene() {
  return (
    <svg
      className='maquetteScene__svg'
      viewBox={`0 0 ${SCENE.w} ${SCENE.h}`}
      preserveAspectRatio='xMidYMid meet'
      focusable='false'
      aria-hidden='true'
    >
      <defs>
        <radialGradient id={`${UID}FloorShadow`} cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0' stopColor='var(--maquette-ink)' stopOpacity='0.28' />
          <stop offset='1' stopColor='var(--maquette-ink)' stopOpacity='0' />
        </radialGradient>
        <linearGradient id={`${UID}TopGlint`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='var(--maquette-cream-lit)' stopOpacity='0.85' />
          <stop offset='1' stopColor='var(--maquette-cream-lit)' stopOpacity='0' />
        </linearGradient>
        <radialGradient id={`${UID}Brass`} cx='0.35' cy='0.32' r='0.7'>
          <stop offset='0' stopColor='var(--maquette-brass-lit)' />
          <stop offset='0.45' stopColor='var(--maquette-brass)' />
          <stop offset='1' stopColor='var(--maquette-brass-shade)' />
        </radialGradient>
        <radialGradient id={`${UID}BrassGlint`} cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0' stopColor='var(--maquette-cream-lit)' stopOpacity='0.9' />
          <stop offset='1' stopColor='var(--maquette-cream-lit)' stopOpacity='0' />
        </radialGradient>
        <linearGradient id={`${UID}BrassRail`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='var(--maquette-brass-lit)' />
          <stop offset='0.5' stopColor='var(--maquette-brass)' />
          <stop offset='1' stopColor='var(--maquette-brass-shade)' />
        </linearGradient>
        <linearGradient id={`${UID}BridgeFace`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='var(--maquette-cream-lit)' />
          <stop offset='1' stopColor='var(--maquette-cream)' />
        </linearGradient>
        <filter
          id={`${UID}Grain`}
          x='-5%'
          y='-5%'
          width='110%'
          height='110%'
          colorInterpolationFilters='sRGB'
        >
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.9'
            numOctaves='2'
            stitchTiles='stitch'
            result='noise'
          />
          <feColorMatrix
            in='noise'
            type='luminanceToAlpha'
            result='alphaNoise'
          />
          <feComponentTransfer in='alphaNoise' result='softNoise'>
            <feFuncA type='linear' slope='0.08' />
          </feComponentTransfer>
          <feBlend in='SourceGraphic' in2='softNoise' mode='multiply' />
        </filter>
      </defs>

      {/* Soft studio floor plane */}
      <ellipse
        cx={540}
        cy={368}
        rx={460}
        ry={28}
        fill={`url(#${UID}FloorShadow)`}
        opacity={0.18}
      />

      <g id='architecture'>
        <g id='burgundy-cylinder' className='maquette__part maquette__burgundy'>
          <Cylinder
            cx={118}
            top={292}
            h={52}
            rx={72}
            face='var(--maquette-burgundy)'
            lit='var(--maquette-burgundy-lit)'
            shade='var(--maquette-burgundy-shade)'
          />
        </g>

        <g id='pink-block' className='maquette__part maquette__pink'>
          <TallBlock
            x={210}
            y={108}
            w={68}
            h={236}
            face='var(--maquette-pink)'
            lit='var(--maquette-pink-lit)'
            shade='var(--maquette-pink-shade)'
          />
        </g>

        <g id='cream-cylinder' className='maquette__part maquette__creamCyl'>
          <Cylinder
            cx={430}
            top={278}
            h={66}
            rx={78}
            face='var(--maquette-cream)'
            lit='var(--maquette-cream-lit)'
            shade='var(--maquette-cream-shade)'
          />
        </g>

        <g id='mustard-block' className='maquette__part maquette__mustard'>
          <TallBlock
            x={580}
            y={112}
            w={68}
            h={232}
            face='var(--maquette-mustard)'
            lit='var(--maquette-mustard-lit)'
            shade='var(--maquette-mustard-shade)'
          />
        </g>

        <g id='blue-cylinder' className='maquette__part maquette__blue'>
          <Cylinder
            cx={820}
            top={300}
            h={48}
            rx={82}
            face='var(--maquette-blue)'
            lit='var(--maquette-blue-lit)'
            shade='var(--maquette-blue-shade)'
          />
        </g>

        <g id='bridge' className='maquette__part maquette__bridge'>
          <GroundShadow cx={430} cy={118} rx={200} ry={8} opacity={0.12} />
          <rect
            x={248}
            y={96}
            width={368}
            height={26}
            rx={3}
            fill={`url(#${UID}BridgeFace)`}
            filter={`url(#${UID}Grain)`}
          />
          <rect
            x={248}
            y={118}
            width={368}
            height={10}
            fill='var(--maquette-cream-shade)'
            opacity={0.9}
          />
          <rect
            x={248}
            y={96}
            width={368}
            height={4}
            fill='var(--maquette-cream-lit)'
            opacity={0.55}
          />
        </g>
      </g>

      <g id='ladder' className='maquette__part maquette__ladder'>
        <line
          x1={188}
          y1={330}
          x2={228}
          y2={100}
          stroke={`url(#${UID}BrassRail)`}
          strokeWidth={3.2}
          strokeLinecap='round'
        />
        <line
          x1={204}
          y1={332}
          x2={244}
          y2={102}
          stroke={`url(#${UID}BrassRail)`}
          strokeWidth={3.2}
          strokeLinecap='round'
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const t = 0.12 + i * 0.1;
          const x1 = 188 + (228 - 188) * t;
          const y1 = 330 + (100 - 330) * t;
          const x2 = 204 + (244 - 204) * t;
          const y2 = 332 + (102 - 332) * t;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke='var(--maquette-brass-shade)'
              strokeWidth={2.4}
              strokeLinecap='round'
              opacity={0.9}
            />
          );
        })}
      </g>

      <g id='spheres'>
        <g id='centre-sphere' className='maquette__part maquette__centreSphere'>
          <Sphere cx={430} cy={248} r={32} />
        </g>
        <g id='moving-sphere' className='maquette__part maquette__movingSphere'>
          <Sphere cx={620} cy={78} r={28} />
        </g>
      </g>

      <g id='people'>
        <FigureShell id='ladder-person' className='maquette__ladderPerson'>
          <Person
            x={208}
            y={250}
            scale={0.92}
            skin='deep'
            shirt='var(--maquette-shirt)'
            legs='var(--maquette-khaki)'
            hair='var(--figure-hair)'
            hairStyle='loc'
            pose='climb'
          />
        </FigureShell>

        <FigureShell id='bridge-person' className='maquette__bridgePerson'>
          <Person
            x={255}
            y={78}
            scale={0.88}
            skin='brown'
            shirt='var(--maquette-shirt)'
            legs='var(--maquette-olive)'
            hair='var(--figure-hair-dark)'
            hairStyle='bun'
            pose='lean'
          />
        </FigureShell>

        <FigureShell id='sphere-person' className='maquette__spherePerson'>
          <Person
            x={655}
            y={82}
            scale={0.9}
            skin='deep'
            shirt='var(--maquette-suit)'
            legs='var(--maquette-suit)'
            hair='var(--figure-hair)'
            hairStyle='crop'
            pose='lean'
            mirror
          />
        </FigureShell>

        <FigureShell id='director-person' className='maquette__directorPerson'>
          <Person
            x={360}
            y={300}
            scale={0.95}
            skin='light'
            shirt='var(--maquette-navy)'
            legs='var(--maquette-khaki)'
            hair='var(--figure-hair-grey)'
            hairStyle='grey'
            pose='point'
          />
        </FigureShell>

        <FigureShell id='tablet-person' className='maquette__tabletPerson'>
          <Person
            x={540}
            y={302}
            scale={0.92}
            skin='deep'
            shirt='var(--maquette-shirt)'
            legs='var(--maquette-cream-shade)'
            hair='var(--figure-hair)'
            hairStyle='crop'
            pose='tablet'
          />
        </FigureShell>

        <FigureShell id='blue-block-person' className='maquette__bluePerson'>
          <Person
            x={745}
            y={305}
            scale={0.95}
            skin='warm'
            shirt='var(--maquette-rust)'
            legs='var(--maquette-slate)'
            hair='var(--figure-hair-dark)'
            hairStyle='short'
            pose='push'
          />
        </FigureShell>
      </g>
    </svg>
  );
}
