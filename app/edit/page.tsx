"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [landingPage, setLandingPage] = useState(`
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">Welcome to My Product</h1>
      <p class="text-xl mb-8">This is an amazing digital product that will help you achieve your goals.</p>
      <div class="bg-blue-100 p-6 rounded-lg mb-8">
        <h2 class="text-2xl font-bold mb-4">Key Features</h2>
        <ul class="list-disc pl-6">
          <li>Feature 1: Something awesome</li>
          <li>Feature 2: Another great thing</li>
          <li>Feature 3: More amazing stuff</li>
        </ul>
      </div>
      <button class="bg-blue-500 text-white px-8 py-3 rounded-lg">Buy Now</button>
    </div>
  `);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionBox, setSelectionBox] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [editingText, setEditingText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editPosition, setEditPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const resultsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (resultsRef.current) {
      e.preventDefault(); // Prevent text selection
      if (isEditing) {
        setIsEditing(false);
        setEditingText("");
      }
      setIsSelecting(true);
      const rect = resultsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSelectionStart({ x, y });
      setSelectionBox({ x, y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting && resultsRef.current) {
      e.preventDefault(); // Prevent text selection while dragging
      const rect = resultsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSelectionBox({
        x: Math.min(x, selectionStart.x),
        y: Math.min(y, selectionStart.y),
        width: Math.abs(x - selectionStart.x),
        height: Math.abs(y - selectionStart.y),
      });
    }

    if (isDragging && resultsRef.current) {
      const rect = resultsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;

      setEditPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setDragStart({ x, y });
    }

    if (isResizing && resultsRef.current) {
      const rect = resultsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (resizeDirection.includes("e")) {
        setSelectionBox((prev) => ({
          ...prev,
          width: x - prev.x,
        }));
      }
      if (resizeDirection.includes("w")) {
        const newWidth = selectionBox.x + selectionBox.width - x;
        setSelectionBox((prev) => ({
          ...prev,
          x,
          width: newWidth,
        }));
      }
      if (resizeDirection.includes("s")) {
        setSelectionBox((prev) => ({
          ...prev,
          height: y - prev.y,
        }));
      }
      if (resizeDirection.includes("n")) {
        const newHeight = selectionBox.y + selectionBox.height - y;
        setSelectionBox((prev) => ({
          ...prev,
          y,
          height: newHeight,
        }));
      }
    }
  };

  const handleMouseUp = () => {
    if (isSelecting) {
      setIsSelecting(false);
      setIsEditing(true);
      setEditPosition({ x: selectionBox.x, y: selectionBox.y });
    }
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleEditSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      setLandingPage((prev) => prev.replace(/>[^<]+</, `>${editingText}<`));
      setEditingText("");
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditingText("");
    }
  };

  const handleTextareaMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!resultsRef.current) return;

    const rect = textareaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Define edge detection zones (10px from edges)
    const edgeSize = 10;
    const isLeft = x < edgeSize;
    const isRight = x > rect.width - edgeSize;
    const isTop = y < edgeSize;
    const isBottom = y > rect.height - edgeSize;

    if (isLeft || isRight || isTop || isBottom) {
      setIsResizing(true);
      let direction = "";
      if (isTop) direction += "n";
      if (isBottom) direction += "s";
      if (isLeft) direction += "w";
      if (isRight) direction += "e";
      setResizeDirection(direction);
    } else {
      setIsDragging(true);
    }

    setDragStart({
      x: e.clientX - resultsRef.current.getBoundingClientRect().left,
      y: e.clientY - resultsRef.current.getBoundingClientRect().top,
    });
  };

  // Handle clicking outside textarea
  const handleClickOutside = (e: MouseEvent) => {
    if (
      textareaRef.current &&
      !textareaRef.current.contains(e.target as Node)
    ) {
      setIsEditing(false);
      setEditingText("");
    }
  };

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f0] dark:bg-black dark:text-white">
      <h1 className="font-bold z-11 absolute top-4 left-4 flex items-center">
        <svg
          width="49"
          height="14"
          viewBox="0 0 49 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:fill-white"
        >
          <path
            d="M6.28808 13.6421C2.73904 13.6421 0.651367 10.7889 0.651367 7.23987C0.651367 3.55164 2.94781 0.559314 7.33192 0.559314C11.8552 0.559314 13.3862 3.62123 13.4558 5.36096H10.1851C10.1155 4.38671 9.28041 2.92534 7.26233 2.92534C5.10507 2.92534 3.71329 4.80425 3.71329 7.10069C3.71329 9.39713 5.10507 11.276 7.26233 11.276C9.21082 11.276 10.0459 9.74507 10.3938 8.21411H7.26233V6.96151H13.8333V13.3637H10.9506V9.32754C10.7418 10.7889 9.83712 13.6421 6.28808 13.6421Z"
            fill="currentColor"
          />
          <path
            d="M19.678 13.6416C16.964 13.6416 15.2939 11.8323 15.2939 8.21362V0.767589H18.2166V8.21362C18.2166 10.0925 19.1213 10.9972 20.6522 10.9972C23.6445 10.9972 24.758 7.30896 24.758 4.73417V0.767589H27.6807V13.3632H24.8276V8.70074C24.2709 11.2755 22.7399 13.6416 19.678 13.6416Z"
            fill="currentColor"
          />
          <path
            d="M45.1462 0.552246C42.6528 0.552246 41.0798 2.96106 40.5663 5.1883C40.4785 2.20353 39.0107 0.552246 36.6621 0.552246C34.6331 0.552246 32.7506 2.36173 32.2617 5.22434V0.766511H29.4125V13.3624H32.2982V8.84684C32.2982 7.72739 32.7649 3.13331 35.6699 3.13331C37.5517 3.13331 37.7479 4.83076 37.7479 7.15106V13.3624H40.6322V8.84684C40.6322 7.72739 41.1182 3.13331 44.0232 3.13331C45.9033 3.13331 46.0977 4.83076 46.0977 7.15106V13.3624H48.986V5.91202C48.9993 2.33773 47.7373 0.552246 45.1462 0.552246Z"
            fill="currentColor"
          />
        </svg>
        <span
          className="ml-2 text-dark dark:text-white rounded-full px-2 border-1 border-black dark:border-white"
          style={{ backgroundColor: "rgb(255, 144, 232)" }}
        >
          .new
        </span>
      </h1>

      <div
        ref={resultsRef}
        className="relative w-full min-h-screen p-4 select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div dangerouslySetInnerHTML={{ __html: landingPage }} />
      </div>

      {isSelecting && (
        <div
          className="absolute border-2 border-dashed opacity-30 rounded-lg"
          style={{
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
            borderColor: "rgb(255, 144, 232)",
            backgroundColor: "rgb(255, 144, 232)",
            borderWidth: "2px",
          }}
        />
      )}

      {isEditing && (
        <div
          className="absolute"
          style={{
            left: editPosition.x,
            top: editPosition.y,
            width: selectionBox.width,
            height: selectionBox.height,
          }}
        >
          <textarea
            ref={textareaRef}
            className="relative p-2 resize-none rounded-[20px] w-full h-full"
            style={{
              border: "2px solid transparent",
              cursor: isDragging
                ? "move"
                : isResizing
                ? resizeDirection.includes("n") || resizeDirection.includes("s")
                  ? "ns-resize"
                  : resizeDirection.includes("e") ||
                    resizeDirection.includes("w")
                  ? "ew-resize"
                  : resizeDirection.includes("ne") ||
                    resizeDirection.includes("sw")
                  ? "nesw-resize"
                  : "nwse-resize"
                : "default",
              outlineColor: "rgb(255, 144, 232)",
              outlineWidth: "2px",
              outlineStyle: "dashed",
            }}
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={handleEditSubmit}
            onMouseDown={handleTextareaMouseDown}
            autoFocus
          />
          <button
            className="absolute px-3 py-1 text-sm cursor-pointer font-bold rounded bg-[rgb(255,144,232)] rounded-full text-black border-black border-1"
            style={{
              right: 10,
              bottom: 10,
            }}
            onClick={() => {
              setIsEditing(false);
              setLandingPage((prev) =>
                prev.replace(/>[^<]+</, `>${editingText}<`)
              );
              setEditingText("");
            }}
          >
            Make changes
          </button>
        </div>
      )}
    </div>
  );
}
