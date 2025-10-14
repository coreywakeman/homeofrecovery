import React from "react";
import logoWalnut from "@/assets/logo-walnut.png";
import logoWhite from "@/assets/logo-white.png";
import logoBeige from "@/assets/logo-beige.png";

interface LogoProps {
  variant?: "walnut" | "white" | "beige";
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = "walnut", className, alt = "Home of Recovery" }) => {
  const src = variant === "white" ? logoWhite : variant === "beige" ? logoBeige : logoWalnut;
  return <img src={src} alt={alt} className={className ?? "h-10 w-auto"} style={{ backgroundColor: "transparent" }} loading="lazy" decoding="async" draggable={false} />;
};

export default Logo;
