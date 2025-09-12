"use client";

import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, className, appName, type = "button", style, onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      type={type}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};