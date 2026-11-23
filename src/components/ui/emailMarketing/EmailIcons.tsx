type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: false as const
};

export const EmailIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect
      x='3.25'
      y='5.25'
      width='17.5'
      height='13.5'
      rx='2'
      stroke='currentColor'
      strokeWidth='1.7'
    />
    <path
      d='M4 7.5 12 13l8-5.5'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinejoin='round'
    />
  </svg>
);

export const PeopleIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='9' cy='8' r='2.2' stroke='currentColor' strokeWidth='1.7' />
    <circle cx='15.5' cy='8.5' r='1.8' stroke='currentColor' strokeWidth='1.7' />
    <path
      d='M4.8 17.2c.5-2.4 2.2-3.6 4.2-3.6s3.7 1.2 4.2 3.6'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
    />
    <path
      d='M13.2 13.8c1.5-.2 2.9.4 3.6 1.6.6 1 .8 1.7.9 2'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
    />
  </svg>
);

export const TargetIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='7.4' stroke='currentColor' strokeWidth='1.7' />
    <circle cx='12' cy='12' r='3.6' stroke='currentColor' strokeWidth='1.7' />
    <circle cx='12' cy='12' r='1.15' fill='currentColor' />
  </svg>
);

export const ReengageIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path
      d='M7.2 8.2A6.2 6.2 0 0 1 17.6 9'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
    />
    <path
      d='M16.8 15.8A6.2 6.2 0 0 1 6.4 15'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
    />
    <path
      d='M16.2 5.8 17.8 9.2 14.4 9.4'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7.8 18.2 6.2 14.8 9.6 14.6'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
