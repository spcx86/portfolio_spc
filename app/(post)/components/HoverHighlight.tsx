"use client";

import React, { useState } from 'react';

interface HoverHighlightProps {
  children: React.ReactNode;
}

export function HoverHighlight({ children }: HoverHighlightProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`absolute inset-0 bg-gray-200 dark:bg-[#313131] rounded-sm transition-opacity duration-200 ease-in-out ${isHovering ? 'opacity-50' : 'opacity-0'}`} />
      {children}
    </div>
  );
}
