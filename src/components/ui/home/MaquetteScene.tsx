import Image from "next/image";

// 03 — Architectural maquette scene as layered cutouts (Option 1).
// Content rects start from public/home/maquette/source/spec-sheet.png (1001×403),
// then by-eye: people ~1.5× still scale; ladder person seated on the rails;
// spheres seated on cream / mustard. PNGs unchanged — placement only.
// Image boxes are derived from those content rects + each PNG's alpha inset.

export const SCENE = { w: 1001, h: 403 };

type Inset = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Content = {
  left: number;
  top: number;
  width: number;
  /** Optional subject height % — when set, the layer is stretched vertically
   *  to that height (used when a cutout's aspect differs from the still). */
  height?: number;
};

type Layer = {
  id: string;
  src: string;
  className: string;
  /** Entrance fade wave: 1 forms → 2 props → 3 people */
  wave: 1 | 2 | 3;
  z: number;
  iw: number;
  ih: number;
  inset: Inset;
  /** Subject rect as % of the 1001×403 spec sheet */
  content: Content;
};

function imageBox(content: Content, inset: Inset, iw: number, ih: number) {
  const width = content.width / (inset.width / 100);
  const height =
    content.height != null
      ? content.height / (inset.height / 100)
      : width * (ih / iw) * (SCENE.w / SCENE.h);
  return {
    left: content.left - (inset.left / 100) * width,
    top: content.top - (inset.top / 100) * height,
    width,
    height,
    stretch: content.height != null
  };
}

// Alpha insets from the transparent PNGs.
// Content rects remeasured against source/spec-sheet.png (1001×403) so
// ground contacts, beam seating, and figure placements match the still.
const LAYERS: Layer[] = [
  {
    id: "plum-cylinder",
    src: "/home/maquette/layers/01-plum-cylinder.png",
    className: "maquette__part maquette__burgundy",
    wave: 1,
    z: 1,
    iw: 1152,
    ih: 864,
    inset: { left: 14.24, top: 20.95, width: 71.18, height: 60.76 },
    content: { left: 3.2, top: 64.0, width: 15.5 }
  },
  {
    id: "cream-cylinder",
    src: "/home/maquette/layers/03-cream-cylinder.png",
    className: "maquette__part maquette__creamCyl",
    wave: 1,
    z: 2,
    iw: 1024,
    ih: 1024,
    inset: { left: 17.87, top: 12.89, width: 64.75, height: 74.32 },
    content: { left: 39.0, top: 65.0, width: 10.8 }
  },
  {
    id: "pink-cube",
    src: "/home/maquette/layers/02-pink-cube.png",
    className: "maquette__part maquette__pink",
    wave: 1,
    z: 3,
    iw: 1024,
    ih: 1024,
    inset: { left: 23.14, top: 8.69, width: 55.57, height: 82.71 },
    content: { left: 18.8, top: 17.2, width: 18.5 }
  },
  {
    id: "mustard-cube",
    src: "/home/maquette/layers/04-mustard-cube.png",
    className: "maquette__part maquette__mustard",
    wave: 1,
    z: 4,
    iw: 1024,
    ih: 1024,
    inset: { left: 14.75, top: 15.53, width: 71.97, height: 66.89 },
    // Cutout is squat vs the still's tall cube — stretch height to the still.
    content: { left: 53.5, top: 18.0, width: 17.0, height: 73.0 }
  },
  {
    id: "blue-cylinder",
    src: "/home/maquette/layers/05-blue-cylinder.png",
    className: "maquette__part maquette__blue",
    wave: 1,
    z: 5,
    iw: 1152,
    ih: 864,
    inset: { left: 11.46, top: 17.59, width: 75.95, height: 64.93 },
    content: { left: 69.5, top: 63.5, width: 16.0 }
  },
  {
    id: "cream-beam",
    src: "/home/maquette/layers/06-cream-beam.png",
    className: "maquette__part maquette__bridge",
    wave: 1,
    z: 6,
    iw: 1280,
    ih: 720,
    // Dense bar core only — soft shadow excluded so seating is on the bar.
    inset: { left: 6.25, top: 39.03, width: 88.75, height: 17.78 },
    content: { left: 26.5, top: 8.5, width: 40.0 }
  },
  {
    id: "ladder",
    src: "/home/maquette/layers/09-ladder.png",
    className: "maquette__part maquette__ladder",
    wave: 2,
    z: 7,
    iw: 864,
    ih: 1152,
    inset: { left: 29.51, top: 5.03, width: 43.87, height: 89.24 },
    // Scaled with the ladder person so rungs stay under hands/feet.
    content: { left: 15.4, top: 20.5, width: 7.4 }
  },
  {
    id: "centre-sphere",
    src: "/home/maquette/layers/07-centre-sphere.png",
    className: "maquette__part maquette__centreSphere",
    wave: 2,
    z: 8,
    iw: 1024,
    ih: 1024,
    inset: { left: 16.5, top: 14.26, width: 68.16, height: 67.87 },
    // Seat centred on the cream cylinder's top ellipse.
    content: { left: 40.0, top: 47.2, width: 9.0 }
  },
  {
    id: "ladder-person",
    src: "/home/maquette/layers/11-person-ladder.png",
    className: "maquette__person maquette__ladderPerson",
    wave: 3,
    z: 9,
    iw: 864,
    ih: 1152,
    inset: { left: 25.46, top: 5.12, width: 57.64, height: 87.15 },
    // Body on the rails (was too far right of ladder; ~1.5× still scale).
    content: { left: 14.0, top: 24.5, width: 8.4 }
  },
  {
    id: "beam-person",
    src: "/home/maquette/layers/12-person-beam.png",
    className: "maquette__person maquette__bridgePerson",
    wave: 3,
    z: 10,
    iw: 864,
    ih: 1152,
    inset: { left: 9.26, top: 11.02, width: 87.15, height: 70.66 },
    // Feet on pink top (~17); head may clip above the frame.
    content: { left: 21.6, top: -9.5, width: 10.2 }
  },
  {
    id: "pointing-person",
    src: "/home/maquette/layers/13-person-pointing.png",
    className: "maquette__person maquette__directorPerson",
    wave: 3,
    z: 11,
    iw: 864,
    ih: 1152,
    inset: { left: 23.96, top: 5.73, width: 57.52, height: 86.2 },
    content: { left: 29.0, top: 43.5, width: 9.6 }
  },
  {
    id: "tablet-person",
    src: "/home/maquette/layers/14-person-tablet.png",
    className: "maquette__person maquette__tabletPerson",
    wave: 3,
    z: 12,
    iw: 864,
    ih: 1152,
    inset: { left: 28.82, top: 4.69, width: 37.15, height: 88.8 },
    content: { left: 49.8, top: 37.5, width: 6.6 }
  },
  {
    id: "sphere-person",
    src: "/home/maquette/layers/15-person-sphere.png",
    className: "maquette__person maquette__spherePerson",
    wave: 3,
    z: 13,
    iw: 864,
    ih: 1152,
    inset: { left: 12.15, top: 3.65, width: 78.59, height: 86.98 },
    // Feet on mustard top (~18); head clips above the frame like the still.
    content: { left: 62.5, top: -21.5, width: 11.2 }
  },
  {
    id: "blue-person",
    src: "/home/maquette/layers/16-person-blue.png",
    className: "maquette__person maquette__bluePerson",
    wave: 3,
    z: 14,
    iw: 864,
    ih: 1152,
    inset: { left: 8.8, top: 7.38, width: 89.12, height: 78.82 },
    content: { left: 79.5, top: 52.5, width: 12.3 }
  },
  {
    id: "moving-sphere",
    src: "/home/maquette/layers/08-moving-sphere.png",
    className: "maquette__part maquette__movingSphere",
    wave: 2,
    z: 15,
    iw: 1024,
    ih: 1024,
    inset: { left: 21.29, top: 17.29, width: 59.57, height: 59.28 },
    // On mustard top at the beam end, under the sphere person's hands.
    content: { left: 60.8, top: 12.2, width: 6.2 }
  }
];

export default function MaquetteScene() {
  return (
    <div className='maquetteScene__stack' aria-hidden='true'>
      {LAYERS.map(layer => {
        const box = imageBox(layer.content, layer.inset, layer.iw, layer.ih);
        return (
          <div
            key={layer.id}
            className={`maquetteScene__layer maquette__wave${layer.wave} ${layer.className}${
              box.stretch ? " is-stretched" : ""
            }`}
            style={{
              left: `${box.left}%`,
              top: `${box.top}%`,
              width: `${box.width}%`,
              ...(box.stretch ? { height: `${box.height}%` } : null),
              zIndex: layer.z
            }}
          >
            <Image
              src={layer.src}
              alt=''
              width={layer.iw}
              height={layer.ih}
              sizes={`${Math.round((box.width / 100) * SCENE.w)}px`}
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
