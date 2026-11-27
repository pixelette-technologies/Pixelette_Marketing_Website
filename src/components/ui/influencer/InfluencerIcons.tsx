type IconName = "people" | "megaphone" | "clapper" | "chart" | "star";

const InfluencerIcon = ({ name }: { name: IconName }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: false as const,
    className: "ipIcon"
  };

  switch (name) {
    case "people":
      return (
        <svg {...common}>
          <circle cx='9' cy='8' r='3' />
          <path d='M3.5 19c.6-3 2.7-4.5 5.5-4.5S14.4 16 15 19' />
          <circle cx='17' cy='9' r='2.5' />
          <path d='M14.2 19c.4-2.2 1.8-3.4 3.8-3.4 1.4 0 2.5.6 3.2 1.6' />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d='M4 11v2a2 2 0 0 0 2 2h1l3 4h2l-1.5-4H14l6-3.5V8.5L14 5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z' />
          <path d='M4 13h3' />
        </svg>
      );
    case "clapper":
      return (
        <svg {...common}>
          <path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z' />
          <path d='M3 9l3.2-5.2a1 1 0 0 1 1.3-.4L10 5l3.2-2.6a1 1 0 0 1 1.3.3L18 7.5 21 9' />
          <path d='M10 5l-1.5 4M14.5 4.5 13 9' />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d='M4 19V5' />
          <path d='M4 19h16' />
          <path d='M8 16V11' />
          <path d='M12 16V8' />
          <path d='M16 16v-5' />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d='M12 3.5l2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 15.8 7.4 18l.9-5.2L4.5 9l5.2-.8L12 3.5z' />
        </svg>
      );
  }
};

export default InfluencerIcon;
export type { IconName };
