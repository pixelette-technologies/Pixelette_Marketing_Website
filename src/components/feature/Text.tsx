import React, { FC } from "react";

interface TextProps {
  className?: string;
  children: React.ReactNode;
}

// Phase F. Emitted `text_${className}` until now, with the same consequence
// described at length in Heading.tsx: .lead, .body and .small could never
// reach the DOM through this component. Class emitted verbatim; legacy call
// sites carry the `text_` prefix themselves.
const Text: FC<TextProps> = ({ className = "", children }) => {
  return <p className={className}>{children}</p>;
};

export default Text;
