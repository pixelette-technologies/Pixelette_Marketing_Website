type IconName = "navigation" | "readable" | "keyboard" | "devices" | "message";

const AccessibilityIcon = ({ name }: { name: IconName }) => {
  if (name === "navigation") {
    return (
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <circle cx='16' cy='6.5' r='2.15' />
        <circle cx='7.2' cy='25.2' r='2.15' />
        <circle cx='24.8' cy='25.2' r='2.15' />
        <path d='M16 8.7v6.2M7.2 16.2h17.6M7.2 16.2v6.6M24.8 16.2v6.6' />
      </svg>
    );
  }

  if (name === "readable") {
    return (
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <text
          x='16'
          y='21'
          textAnchor='middle'
          fill='currentColor'
          stroke='none'
          fontSize='16'
          fontWeight='650'
          fontFamily='var(--font-body), sans-serif'
        >
          Aa
        </text>
      </svg>
    );
  }

  if (name === "keyboard") {
    return (
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <rect x='3.5' y='7.5' width='25' height='17' rx='2.5' />
        <path d='M8 12.4h2.1M14 12.4h2.1M20 12.4h2.1M8 16.6h2.1M13 16.6h6M21.2 16.6h2.1' />
      </svg>
    );
  }

  if (name === "devices") {
    return (
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <rect x='11' y='4.5' width='10' height='23' rx='2.2' />
        <path d='M14.2 7.2h3.6' />
        <circle cx='16' cy='23.4' r='0.9' fill='currentColor' stroke='none' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 32 32' aria-hidden='true'>
      <path d='M5.2 9.2h11.2a2.4 2.4 0 0 1 2.4 2.4v4.6a2.4 2.4 0 0 1-2.4 2.4H12l-2.3 2.1v-2.1H5.2a2.4 2.4 0 0 1-2.4-2.4v-4.6a2.4 2.4 0 0 1 2.4-2.4z' />
      <path d='M15.2 14.6h9.2a2.2 2.2 0 0 1 2.2 2.2v3.6a2.2 2.2 0 0 1-2.2 2.2H21v1.8l-2-1.8h-3.8a2.2 2.2 0 0 1-2.2-2.2' />
    </svg>
  );
};

export default AccessibilityIcon;
