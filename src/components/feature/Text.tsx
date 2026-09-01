import React, { FC } from "react";

interface TextProps {
  className?: string;
  children: React.ReactNode;
}

const Text: FC<TextProps> = ({
  className = "",
  children
}) => {
  return (
    <p
      className={`text_${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
