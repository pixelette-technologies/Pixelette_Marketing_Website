// The office marker on /contactus. Drawn on the same 24px grid and stroke as
// MailIcon, in currentColor, so it takes the colour of the text it labels.
const PinIcon = () => {
  return (
    <svg
      aria-hidden='true'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 21C12 21 19 14.8 19 9.5C19 5.63 15.87 2.5 12 2.5C8.13 2.5 5 5.63 5 9.5C5 14.8 12 21 12 21Z'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='12' cy='9.5' r='2.5' stroke='currentColor' strokeWidth='1.6' />
    </svg>
  );
};

export default PinIcon;
