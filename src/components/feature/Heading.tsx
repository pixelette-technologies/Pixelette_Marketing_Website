interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Optional, defaults to 2 (h1 reserved for the page hero title)
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
  level = 2
}: HeadingProps) => {
  const Tag = tagMap[level];

  return (
    <Tag
      className={`heading_${className}`}
    >
      {children}
    </Tag>
  );
};

export default Heading;
