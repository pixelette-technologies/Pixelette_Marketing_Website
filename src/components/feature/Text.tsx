import React, { FC } from "react";

interface TextProps {
  className?: string;
  animation?: string;
  duration?: string;
  children: React.ReactNode;
}

const Text: FC<TextProps> = ({
  className = "",
  animation,
  duration,
  children
}) => {
  return (
    <p
      className={`text_${className}`}
      data-aos={animation}
      data-aos-duration={duration}
    >
      {children}
    </p>
  );
};

export default Text;
