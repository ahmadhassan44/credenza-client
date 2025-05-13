import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={`rounded-full object-cover ${className}`}
    style={{ width: 96, height: 96 }}
  />
);
