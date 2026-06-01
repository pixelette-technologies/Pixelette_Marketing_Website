interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  animation?: string;
  duration?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Optional, defaults to 1
}

const tagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

const Heading = ({
  className = "",
  children,
  animation,
  duration,
  level = 1
}: HeadingProps) => {
  const Tag = tagMap[level];

  return (
    <Tag
      className={`heading_${className}`}
      data-aos={animation}
      data-aos-duration={duration}
    >
      {children}
    </Tag>
  );
};

export default Heading;
