import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";

const { audiences, hero } = prEarnedMediaContent;

type AudienceId = (typeof audiences)[number]["id"];

// Original editorial panels. The handoff references are flattened mockups of
// another studio's collage and are not licensed production layers, so none of
// those photographs are used. These drawings are Pixelette-made: lens geometry,
// silhouettes, a facade grid and a crowd band. They are decorative; the
// audience names are HTML text.

const AudienceArt = ({ id }: { id: AudienceId }) => {
  if (id === "media") {
    return (
      <svg className='prCollage__art' viewBox='0 0 640 180' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>
        <rect width='640' height='180' fill='#1a0d0b' />
        <circle cx='470' cy='90' r='78' fill='#3a1c16' />
        <circle cx='470' cy='90' r='62' fill='none' stroke='#c4a27a' strokeWidth='9' />
        <circle cx='470' cy='90' r='40' fill='#0e0807' stroke='#6e3b32' strokeWidth='7' />
        <ellipse cx='452' cy='72' rx='12' ry='7' fill='#f6eadc' opacity='0.7' />
        <circle cx='120' cy='40' r='18' fill='#b3063c' opacity='0.85' />
        <circle cx='210' cy='140' r='10' fill='#d4532b' opacity='0.7' />
        <path d='M0 150 C 80 120, 160 170, 240 140' fill='none' stroke='#8c0430' strokeWidth='10' />
      </svg>
    );
  }

  if (id === "employees") {
    return (
      <svg className='prCollage__art' viewBox='0 0 640 180' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>
        <defs>
          <linearGradient id='pr-warm' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#f0d2a4' />
            <stop offset='100%' stopColor='#a8643c' />
          </linearGradient>
        </defs>
        <rect width='640' height='180' fill='url(#pr-warm)' />
        <rect x='250' y='18' width='150' height='162' fill='#f6e2c4' opacity='0.45' />
        <g fill='#2a1420'>
          <circle cx='300' cy='78' r='14' />
          <path d='M278 160 L286 108 H314 L322 160 Z' />
          <circle cx='360' cy='84' r='12' />
          <path d='M342 160 L348 114 H372 L380 160 Z' />
          <circle cx='418' cy='90' r='11' />
          <path d='M402 160 L408 120 H430 L438 160 Z' />
        </g>
      </svg>
    );
  }

  if (id === "stakeholders") {
    return (
      <svg className='prCollage__art' viewBox='0 0 640 180' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>
        <rect width='640' height='180' fill='#3a1630' />
        {Array.from({ length: 8 }).map((_, column) =>
          Array.from({ length: 4 }).map((__, row) => (
            <rect
              key={`${column}-${row}`}
              x={40 + column * 72}
              y={22 + row * 38}
              width='28'
              height='18'
              fill={row % 2 === 0 ? "#f4e6ea" : "#d7b8c4"}
              opacity='0.85'
            />
          ))
        )}
        <path d='M0 150 Q 220 90 640 130 L 640 180 L 0 180 Z' fill='#4b1635' />
      </svg>
    );
  }

  return (
    <svg className='prCollage__art' viewBox='0 0 640 180' preserveAspectRatio='xMidYMid slice' aria-hidden='true'>
      <rect width='640' height='180' fill='#efe2dc' />
      <rect y='118' width='640' height='62' fill='#d7c2ba' />
      {Array.from({ length: 14 }).map((_, index) => {
        const x = 28 + index * 42;
        const height = 36 + (index % 3) * 8;
        return (
          <g key={index} fill='#4b1635'>
            <circle cx={x} cy={118 - height} r='7' />
            <rect x={x - 6} y={118 - height + 8} width='12' height={height - 8} rx='3' />
          </g>
        );
      })}
    </svg>
  );
};

const PrCollage = () => {
  return (
    <div className='prCollage'>
      <div className='prCollage__spark' aria-hidden='true'>
        <svg viewBox='0 0 80 80'>
          <path
            fill='currentColor'
            d='M40 2 L46 28 L72 12 L52 36 L78 40 L52 46 L74 72 L40 54 L12 78 L28 48 L2 44 L30 36 L10 10 L36 28 Z'
          />
        </svg>
      </div>
      <div className='prCollage__sheet'>
        <p className='prCollage__statement'>
          {hero.statement[0]}
          <br />
          {hero.statement[1]}
          <br />
          <span className='prCollage__emphasis'>{hero.statement[2]}</span>
        </p>
        <svg className='prCollage__scribble' viewBox='0 0 180 24' aria-hidden='true'>
          <path
            d='M4 16 C 40 4, 90 20, 150 8 S 176 14, 176 14'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
          />
        </svg>
      </div>
      <ul className='prCollage__strips'>
        {audiences.map(audience => (
          <li className={`prCollage__strip prCollage__strip--${audience.id}`} key={audience.id}>
            <AudienceArt id={audience.id} />
            <span className='prCollage__label'>{audience.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrCollage;
