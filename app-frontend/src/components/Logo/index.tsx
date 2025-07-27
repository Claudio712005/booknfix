import React from "react";
import logo from "../../assets/booknfix-logo.png";
import { Size } from "@/types/common";
import { Link } from "react-router";

interface LogoProps {
  size?: Size;
  className?: string;
  link?: string;
  alt?: string;
  ariaLabel?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "w-8",
  md: "w-10",
  lg: "w-20",
  xl: "w-24",
  "2xl": "w-32",
  "3xl": "w-40",
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
    <Link to={link} aria-label={ariaLabel} className={`flex items-center ${className}`}>
      <img
        src={logo}
        alt={alt}
        className={`object-contain ${dimensions}`}
        loading="lazy"
      />
    </Link>
  );
};

export default Logo;
