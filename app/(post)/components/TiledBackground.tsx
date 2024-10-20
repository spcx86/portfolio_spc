"use client";

import React, { useState, useEffect, useRef } from 'react';

const TILE_WIDTH = 400;
const TILE_HEIGHT = 200;

export function TiledBackground({ children }: { children: React.ReactNode }) {
  const [tiles, setTiles] = useState<{ x: number; y: number }[]>([]);
  const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTiles = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const newTiles = [];
        for (let x = 0; x < width; x += TILE_WIDTH) {
          for (let y = 0; y < height; y += TILE_HEIGHT) {
            newTiles.push({ x, y });
          }
        }
        setTiles(newTiles);
      }
    };

    updateTiles();
    window.addEventListener('resize', updateTiles);
    return () => window.removeEventListener('resize', updateTiles);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / TILE_WIDTH) * TILE_WIDTH;
      const y = Math.floor((e.clientY - rect.top) / TILE_HEIGHT) * TILE_HEIGHT;
      setHoveredTile({ x, y });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredTile(null)}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-80 backdrop-blur-md z-10"></div>
      <div className="absolute inset-0 z-0">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out rounded-lg ${
              hoveredTile && tile.x === hoveredTile.x && tile.y === hoveredTile.y
                ? 'bg-[#89CFF0] dark:bg-[#89CFF0] opacity-90'
                : 'bg-gray-200 dark:bg-gray-700 opacity-10'
            }`}
            style={{
              left: tile.x,
              top: tile.y,
              width: TILE_WIDTH,
              height: TILE_HEIGHT,
              transitionDelay: hoveredTile ? '0ms' : '300ms',
            }}
          />
        ))}
      </div>
      <div className="relative z-20">{children}</div>
    </div>
  );
}
