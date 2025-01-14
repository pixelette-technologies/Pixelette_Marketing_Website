import React, { FC } from "react";

interface HeadingProps {
  className?: string;
  children: React.ReactNode;
}

const Heading: FC<HeadingProps> = ({ className = "", children }) => {
  return <h1 className={`heading_${className}`}>{children}</h1>;
};

export default Heading;
