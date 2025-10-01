"use client";

import { ReactNode, CSSProperties, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, className, type = "button", style, onClick, onMouseOver, onMouseOut }: ButtonProps) => {
  return  (
    <button
      className={className}
      type={type}
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
};