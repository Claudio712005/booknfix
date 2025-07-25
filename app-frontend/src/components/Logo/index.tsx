import React from "react";
import logo from "../../assets/booknfix-logo.png";
import { Size } from "@/types/common";

interface LogoProps {
  size?: Size;
  className?: string;
  link?: string;
  alt?: string;
  ariaLabel?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-20 h-20",
};

const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  link = "/",
  alt = "Logo BooknFix",
  ariaLabel = "Página inicial",
}) => {
  const dimensions = sizeClasses[size] || sizeClasses["md"];

  return (
    <a href={link} aria-label={ariaLabel} className={`inline-block ${className}`}>
      <img
        src={logo}
        alt={alt}
        className={`object-contain ${dimensions}`}
        loading="lazy"
      />
    </a>
  );
};

export default Logo;
