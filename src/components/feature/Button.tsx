import React, { FC } from "react";
import Link from "next/link";

interface ButtonProps {
  to?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  animation?: string;
  duration?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  to,
  className,
  onClick,
  type = "button",
  children,
  animation,
  duration,
  disabled
}) => {
  return to ? (
    <Link
      href={to}
      className={`btn btn_${className}`}
      data-aos={animation}
      data-aos-duration={duration}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`btn btn_${className}`}
      type={type}
      data-aos={animation}
      data-aos-duration={duration}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
