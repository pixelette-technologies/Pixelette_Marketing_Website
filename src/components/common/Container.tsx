import React, { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className = "", children }) => {
  return <div className={`container_${className} `}>{children}</div>;
};

export default Container;
