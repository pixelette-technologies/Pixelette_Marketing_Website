import React, { FC } from "react";
import Link from "next/link";

interface ButtonProps {
  to?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  to,
  className,
  onClick,
  type = "button",
  children,
  disabled
}) => {
  return to ? (
    <Link
      href={to}
      className={`btn btn_${className}`}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`btn btn_${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
