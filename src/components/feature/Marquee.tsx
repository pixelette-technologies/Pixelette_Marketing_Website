import React, { FC } from "react";
import Marquee from "react-fast-marquee";

interface MarqueeeProps {
  children: React.ReactNode;
}

const Marqueee: FC<MarqueeeProps> = ({ children }) => {
  return (
    <Marquee speed={100} autoFill={true}>
      {children}
    </Marquee>
  );
};

export default Marqueee;
