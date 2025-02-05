"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const COIN_SIZE = 100;
const COIN_MARGIN = 2;
const ADD_COIN_INTERVAL = 50; // Reduced from 100 to 50 to add coins faster

const FallingCoinsLoader: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [coins, setCoins] = useState<Matter.Body[]>([]);
  const textureRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Load texture
    const texture = new Image();
    texture.src = "/icon.png";
    textureRef.current = texture;

    // create engine with normal gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.98 },
    });
    const world = engine.world;

    // create renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    Matter.Render.run(render);

    // create runner with fixed timestep
    const runner = Matter.Runner.create({
      isFixed: true,
      delta: 1000 / 60, // 60 FPS
    });
    Matter.Runner.run(runner, engine);

    // add walls with more bounce - only sides and floor
    const walls = [
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + COIN_SIZE,
        window.innerWidth,
        COIN_SIZE * 2,
        {
          isStatic: true,
          restitution: 0.6,
        }
      ),
      Matter.Bodies.rectangle(
        -COIN_SIZE,
        window.innerHeight / 2,
        COIN_SIZE * 2,
        window.innerHeight,
        {
          isStatic: true,
          restitution: 0.6,
        }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth + COIN_SIZE,
        window.innerHeight / 2,
        COIN_SIZE * 2,
        window.innerHeight,
        {
          isStatic: true,
          restitution: 0.6,
        }
      ),
    ];

    Matter.World.add(world, walls);

    // add mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    engineRef.current = engine;

    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    if (!engineRef.current) return;

    const interval = setInterval(() => {
      // Check if any coins are above the viewport
      const hasSpaceForMoreCoins = coins.every(
        (coin) => coin.position.y > COIN_SIZE
      );

      if (!hasSpaceForMoreCoins) {
        return;
      }

      const angle = Math.random() * Math.PI * 2;
      const newCoin = Matter.Bodies.circle(
        Math.random() * window.innerWidth,
        -COIN_SIZE * 2, // Start higher above viewport
        COIN_SIZE / 2,
        {
          restitution: 0.5,
          friction: 0.1,
          density: 0.002,
          frictionAir: 0.001,
          angle: angle,
          render: {
            sprite: {
              texture: "icon.png",
              xScale: COIN_SIZE / textureRef.current!.width,
              yScale: COIN_SIZE / textureRef.current!.height,
            },
          },
        }
      );

      Matter.World.add(engineRef.current.world, newCoin);
      setCoins((prevCoins) => [...prevCoins, newCoin]);
    }, ADD_COIN_INTERVAL);

    return () => clearInterval(interval);
  }, [coins, engineRef.current]);

  return (
    <div ref={sceneRef} className="fixed inset-0 z-50">
      {/* Remove the coin divs since Matter.js is handling the rendering */}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <FallingCoinsLoader />
    </div>
  );
}
