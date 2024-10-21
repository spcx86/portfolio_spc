"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

const DESKTOP_TILE_WIDTH = 400;
const DESKTOP_TILE_HEIGHT = 200;
const MOBILE_TILE_WIDTH = 150;
const MOBILE_TILE_HEIGHT = 75;
const MIN_HIGHLIGHT_DURATION = 1500; // 1.5 seconds
const MAX_HIGHLIGHT_DURATION = 3000; // 3 seconds
const FADE_DURATION = 1500; // 1.5 seconds for fade-out
const MAX_ACTIVE_TILES = 3; // Maximum number of highlighted tiles on mobile

// Define the Tile type
type Tile = { x: number; y: number; id: string };

// Define the HighlightedTile type
type HighlightedTile = Tile & { endTime: number };

export function TiledBackground({ children }: { children: React.ReactNode }) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [highlightedTiles, setHighlightedTiles] = useState<HighlightedTile[]>([]);
  const [hoveredTile, setHoveredTile] = useState<Tile | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTiles, setShowTiles] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightedTilesRef = useRef<HighlightedTile[]>([]);

  useEffect(() => {
    highlightedTilesRef.current = highlightedTiles;
  }, [highlightedTiles]);

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
            newTiles.push({ x, y, id: `${x}-${y}` });
          }
        }
        setTiles(newTiles);
      }
    };

    updateTiles();
    window.addEventListener('resize', updateTiles);
    return () => window.removeEventListener('resize', updateTiles);
  }, [isMobile]);

  const selectRandomTile = useCallback(() => {
    if (tiles.length > 0 && isMobile) {
      const availableTiles = tiles.filter(tile => 
        !highlightedTilesRef.current.some(ht => ht.id === tile.id)
      );
      if (availableTiles.length > 0 && highlightedTilesRef.current.length < MAX_ACTIVE_TILES) {
        const randomIndex = Math.floor(Math.random() * availableTiles.length);
        const newTile = availableTiles[randomIndex];
        const duration = Math.random() * (MAX_HIGHLIGHT_DURATION - MIN_HIGHLIGHT_DURATION) + MIN_HIGHLIGHT_DURATION;
        const endTime = Date.now() + duration;
        
        setHighlightedTiles(prev => [...prev, { ...newTile, endTime }]);
        
        setTimeout(() => {
          setHighlightedTiles(prev => prev.filter(t => t.id !== newTile.id));
        }, duration + FADE_DURATION);
      }
    }
  }, [tiles, isMobile]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isMobile) {
      intervalId = setInterval(() => {
        selectRandomTile();
      }, Math.random() * 1000 + 500);
    }
    return () => clearInterval(intervalId);
  }, [isMobile, selectRandomTile]);

  useEffect(() => {
    let animationFrameId: number;
    if (isMobile) {
      const animate = () => {
        setHighlightedTiles(prev => prev.filter(tile => tile.endTime > Date.now()));
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile && containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = Math.floor((event.clientX - left) / DESKTOP_TILE_WIDTH) * DESKTOP_TILE_WIDTH;
      const y = Math.floor((event.clientY - top) / DESKTOP_TILE_HEIGHT) * DESKTOP_TILE_HEIGHT;
      setHoveredTile({ x, y, id: `${x}-${y}` });
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setHoveredTile(null);
    }
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-80 backdrop-blur-md z-10"></div>
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${showTiles ? 'opacity-100' : 'opacity-0'}`}>
        {tiles.map((tile) => {
          const highlightedTile = highlightedTiles.find(ht => ht.id === tile.id);
          const isHighlighted = !!highlightedTile;
          const isHovered = !isMobile && hoveredTile && tile.x === hoveredTile.x && tile.y === hoveredTile.y;
          const opacity = isMobile
            ? (isHighlighted ? Math.min(1, (highlightedTile.endTime - Date.now()) / FADE_DURATION) : 0.1)
            : (isHovered ? 0.9 : 0.1);
          
          return (
            <div
              key={tile.id}
              className={`absolute transition-all duration-[1500ms] ease-in-out rounded-lg ${
                (isMobile && isHighlighted) || (!isMobile && isHovered)
                  ? 'bg-[#89CFF0] dark:bg-[#89CFF0]'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              style={{
                left: tile.x,
                top: tile.y,
                width: isMobile ? MOBILE_TILE_WIDTH : DESKTOP_TILE_WIDTH,
                height: isMobile ? MOBILE_TILE_HEIGHT : DESKTOP_TILE_HEIGHT,
                opacity,
              }}
            />
          );
        })}
      </div>
      <div className="relative z-20">{children}</div>
    </div>
  );
}
