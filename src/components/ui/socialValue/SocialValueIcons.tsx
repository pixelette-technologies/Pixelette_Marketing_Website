type IconName = "people" | "bubbles" | "bars";

const SocialValueIcon = ({ name }: { name: IconName }) => {
  if (name === "people") {
    return (
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <circle cx='8.2' cy='11' r='2.15' />
        <circle cx='16' cy='9.1' r='2.35' />
        <circle cx='23.6' cy='11' r='2.15' />
        <path d='M3.8 22.2c.55-2.35 2.15-3.55 4.15-3.55 1.55 0 2.7.6 3.4 1.65' />
        <path d='M11.4 20.7c.7-2.15 2.15-3.25 3.9-3.25s3.15 1.05 3.85 2.95' />
        <path d='M20.3 22.2c.6-2.2 2.15-3.4 4.05-3.4 1.75 0 3.15.9 3.75 2.85' />
      </svg>
    );
  }

  if (name === "bubbles") {
    return (
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <path d='M6.2 8.2h9.6a2.7 2.7 0 0 1 2.7 2.7v4.4a2.7 2.7 0 0 1-2.7 2.7h-3.4l-2.8 2.2v-2.2H6.2a2.7 2.7 0 0 1-2.7-2.7v-4.4a2.7 2.7 0 0 1 2.7-2.7z' />
        <path d='M15.2 14.2h8.4a2.4 2.4 0 0 1 2.4 2.4v3.5a2.4 2.4 0 0 1-2.4 2.4h-1.1v1.9l-2.3-1.9h-5a2.4 2.4 0 0 1-2.4-2.4' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 32 32' aria-hidden='true'>
      <path d='M8 21.5v-5.5' />
      <path d='M16 21.5V9.5' />
      <path d='M24 21.5v-8' />
      <path d='M6 23.5h20' />
    </svg>
  );
};

export default SocialValueIcon;
