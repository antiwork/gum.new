"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const COIN_SIZE = 100;
const ADD_COIN_INTERVAL = 50;

export const Loader = ({ isDoneLoading }: { isDoneLoading: boolean }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [coins, setCoins] = useState<Matter.Body[]>([]);
  const textureRef = useRef<HTMLImageElement | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);

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

    wallsRef.current = walls;
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
      // Create a new canvas element instead of setting to null
      render.canvas = document.createElement("canvas");
      render.context = render.canvas.getContext("2d")!;
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

      // Add random initial velocity
      Matter.Body.setVelocity(newCoin, {
        x: (Math.random() - 0.5) * 5, // Random x velocity between -2.5 and 2.5
        y: Math.random() * 2, // Random downward velocity between 0 and 2
      });

      if (engineRef.current) {
        Matter.World.add(engineRef.current.world, newCoin);
      }
      setCoins((prevCoins) => [...prevCoins, newCoin]);
    }, ADD_COIN_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [coins]);

  useEffect(() => {
    if (isDoneLoading && engineRef.current && wallsRef.current.length) {
      // Remove the floor so coins can fall away when loading is finished
      Matter.World.remove(engineRef.current.world, wallsRef.current[0]);
    }
  }, [isDoneLoading]);

  return <div ref={sceneRef} className="fixed inset-0 z-50"></div>;
};
