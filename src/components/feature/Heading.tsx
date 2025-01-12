import React, { FC } from "react";

interface HeadingProps {
  className?: string;
  animation?: string;
  duration?: string;
  id?: string;
  children: React.ReactNode;
  dataAos?: string;
}

const Heading: FC<HeadingProps> = ({ className = "", animation, duration, id, children }) => {
  return (
    <h1 className={`heading_${className}`} data-aos={animation} data-aos-duration={duration} id={id}>
      {children}
    </h1>
  );
};

export default Heading;
