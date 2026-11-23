type IconName =
  | "target"
  | "play"
  | "people"
  | "chart"
  | "growth"
  | "heart"
  | "chat"
  | "cursor"
  | "bars"
  | "check"
  | "reel";

const SocialIcon = ({ name }: { name: IconName }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: false as const,
    className: "scIcon"
  };

  switch (name) {
    case "target":
      return (
        <svg {...common}>
          <circle cx='12' cy='12' r='8' />
          <circle cx='12' cy='12' r='4' />
          <circle cx='12' cy='12' r='1.25' fill='currentColor' stroke='none' />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d='M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9z' />
          <path d='M10 9.5v5l4.5-2.5L10 9.5z' fill='currentColor' stroke='none' />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx='9' cy='8' r='3' />
          <path d='M3.5 19c.6-3 2.7-4.5 5.5-4.5S14.4 16 15 19' />
          <circle cx='17' cy='9' r='2.5' />
          <path d='M14.2 19c.4-2.2 1.8-3.4 3.8-3.4 1.4 0 2.5.6 3.2 1.6' />
        </svg>
      );
    case "chart":
    case "bars":
      return (
        <svg {...common}>
          <path d='M4 19V5' />
          <path d='M4 19h16' />
          <path d='M8 16V11' />
          <path d='M12 16V8' />
          <path d='M16 16v-5' />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <circle cx='9' cy='8' r='3' />
          <path d='M3.5 19c.6-3 2.7-4.5 5.5-4.5S14.4 16 15 19' />
          <path d='M16 8v5' />
          <path d='M16 8h5' />
          <path d='M16 8l5-3' />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d='M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7.5a3.8 3.8 0 0 1 7 3.3C19 15.6 12 20 12 20z' />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d='M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-4 3.5V6.5z' />
        </svg>
      );
    case "cursor":
      return (
        <svg {...common}>
          <path d='M5 4.5 17.5 12l-5.2 1.4L10.5 19 5 4.5z' />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx='12' cy='12' r='9' />
          <path d='m8.5 12.2 2.4 2.4 4.6-5' />
        </svg>
      );
    case "reel":
      return (
        <svg {...common} strokeWidth={1.5}>
          <rect x='4' y='4' width='16' height='16' rx='3.5' />
          <path d='M8 8h2.2M13.8 8H16M8 16h8' />
          <path d='m10.5 11 4 2.3-4 2.3V11z' fill='currentColor' stroke='none' />
        </svg>
      );
  }
};

export default SocialIcon;
export type { IconName };
