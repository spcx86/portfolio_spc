"use client";

import React, { useState, useEffect, useRef } from 'react';

const DESKTOP_TILE_WIDTH = 400;
const DESKTOP_TILE_HEIGHT = 200;
const MOBILE_TILE_WIDTH = 150;
const MOBILE_TILE_HEIGHT = 75;

// Define the Tile type
type Tile = { x: number; y: number };

export function TiledBackground({ children }: { children: React.ReactNode }) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTiles, setShowTiles] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateTiles = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const tileWidth = isMobile ? MOBILE_TILE_WIDTH : DESKTOP_TILE_WIDTH;
        const tileHeight = isMobile ? MOBILE_TILE_HEIGHT : DESKTOP_TILE_HEIGHT;
        const newTiles: Tile[] = [];
        for (let x = 0; x < width; x += tileWidth) {
          for (let y = 0; y < height; y += tileHeight) {
            newTiles.push({ x, y });
          }
        }
        setTiles(newTiles);
      }
    };

    updateTiles();
    window.addEventListener('resize', updateTiles);
    return () => window.removeEventListener('resize', updateTiles);
  }, [isMobile]);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const tileWidth = isMobile ? MOBILE_TILE_WIDTH : DESKTOP_TILE_WIDTH;
      const tileHeight = isMobile ? MOBILE_TILE_HEIGHT : DESKTOP_TILE_HEIGHT;
      const x = Math.floor((clientX - rect.left) / tileWidth) * tileWidth;
      const y = Math.floor((clientY - rect.top) / tileHeight) * tileHeight;
      setHoveredTile({ x, y });

      setShowTiles(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowTiles(false), 2000);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onMouseLeave={() => setHoveredTile(null)}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-80 backdrop-blur-md z-10"></div>
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${showTiles ? 'opacity-100' : 'opacity-0'}`}>
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
              width: isMobile ? MOBILE_TILE_WIDTH : DESKTOP_TILE_WIDTH,
              height: isMobile ? MOBILE_TILE_HEIGHT : DESKTOP_TILE_HEIGHT,
              transitionDelay: hoveredTile ? '0ms' : '300ms',
            }}
          />
        ))}
      </div>
      <div className="relative z-20">{children}</div>
    </div>
  );
}
