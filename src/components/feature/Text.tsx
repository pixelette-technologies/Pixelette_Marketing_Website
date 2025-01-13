import React, { FC } from "react";

interface TextProps {
  className?: string;
  animation?: string;
  duration?: string;
  id?: string;
  children: React.ReactNode;
}

const Text: FC<TextProps> = ({
  className = "",
  animation,
  duration,
  id,
  children
}) => {
  return (
    <p
      className={`text_${className}`}
      data-aos={animation}
      data-aos-duration={duration}
      id={id}
    >
      {children}
    </p>
  );
};

export default Text;
