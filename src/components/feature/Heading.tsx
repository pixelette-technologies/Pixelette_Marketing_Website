import React, { FC } from "react";

interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  animation?: string;
  duration?: string;
}

const Heading: FC<HeadingProps> = ({
  className = "",
  children,
  animation,
  duration
}) => {
  return (
    <h1
      className={`heading_${className}`}
      data-aos={animation}
      data-aos-duration={duration}
    >
      {children}
    </h1>
  );
};

export default Heading;
