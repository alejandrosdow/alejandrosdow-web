"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
  fallbackClassName?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackText,
  className,
  fallbackClassName,
}: Props) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <span className={fallbackClassName ?? "text-xs text-neutral-400 font-medium"}>
        {fallbackText}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
}
