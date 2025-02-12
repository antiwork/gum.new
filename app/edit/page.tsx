"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../components/Logo";

export default function Home() {
  const [landingPage, setLandingPage] = useState(`
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">Welcome to My Product</h1>
      <p class="text-xl mb-8">This is an amazing digital product that will help you achieve your goals.</p>
      <div class="bg-blue-100 p-6 rounded-lg mb-8 outline-2 outline-blue-500">
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    setIsEditing(true);
  };

  // Add hover and click handlers for content elements
  useEffect(() => {
    if (!resultsRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isEditing) return;

      // Get the element under cursor
      const elements = document.elementsFromPoint(e.clientX, e.clientY);

      // Find the first content element under the cursor within our results container
      const contentElement = elements.find((el) => {
        if (!(el instanceof HTMLElement)) return false;
        if (!resultsRef.current?.contains(el)) return false;
        return ["DIV", "H1", "H2", "P", "BUTTON", "A", "LI"].includes(el.tagName);
      }) as HTMLElement | undefined;

      // Clear previous hover outlines
      const allElements = resultsRef.current.querySelectorAll("div, h1, h2, p, button, a, li");
      allElements.forEach((el) => {
        if (el !== selectedElement) {
          (el as HTMLElement).style.outline = "none";
        }
      });

      // Add hover outline to current element
      if (contentElement && contentElement !== selectedElement) {
        contentElement.style.outline = "2px solid rgba(255, 144, 232, 0.3)";
        contentElement.style.cursor = "pointer";
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (isEditing) return;
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const contentElement = elements.find((el) => {
        if (!(el instanceof HTMLElement)) return false;
        if (!resultsRef.current?.contains(el)) return false;
        return ["DIV", "H1", "H2", "P", "BUTTON", "A", "LI"].includes(el.tagName);
      }) as HTMLElement | undefined;
      if (!contentElement) return;
      e.preventDefault();
      if (selectedElement) {
        selectedElement.style.outline = "none";
      }
      contentElement.style.outline = "2px solid rgb(255, 144, 232)";
      setSelectedElement(contentElement);
      setIsEditing(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [isEditing, selectedElement]);

  // Clear selection when editing is closed
  useEffect(() => {
    if (isEditing || !selectedElement) return;
    selectedElement.style.outline = "none";
    setSelectedElement(null);
  }, [isEditing, selectedElement]);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  // Add custom selection color styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::selection {
        background-color: rgb(255, 144, 232);
        color: black;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsEditing(true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setIsEditing(false);
        setInputText("");
        // Remove focus from any active element
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Setup iframe content when editing starts
  useEffect(() => {
    if (!isEditing || !iframeRef.current) return;
    const iframeDoc = iframeRef.current.contentDocument;
    if (!iframeDoc) return;
    iframeDoc.open();
    iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; }
              input {
                width: 100%;
                height: 100%;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-size: inherit;
              }
            </style>
          </head>
          <body>
            <input type="text" placeholder="Type changes..." />
          </body>
        </html>
      `);
    iframeDoc.close();

    const input = iframeDoc.querySelector("input");
    if (!input) return;
    // Focus input whenever editing starts
    input.focus();

    input.addEventListener("input", (e) => {
      setInputText((e.target as HTMLInputElement).value);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        input.blur();
        // Simulate another Escape key press on the main window
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
          }),
        );
      }
    });
  }, [isEditing]);

  return (
    <div className="min-h-screen bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      <div ref={resultsRef} className="relative min-h-screen w-full p-4" contentEditable>
        <div dangerouslySetInnerHTML={{ __html: landingPage }} />
      </div>

      {!isEditing && (
        <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-1 text-sm text-gray-500">
          <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100">
            ⌘
          </kbd>
          <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100">
            K
          </kbd>
          <span>
            or <span style={{ backgroundColor: "rgb(255, 144, 232)", color: "black" }}>Highlight</span> or{" "}
            <span style={{ backgroundColor: "rgb(255, 144, 232)", color: "black" }}>Click</span> to make changes
          </span>
        </div>
      )}

      {isEditing && (
        <div
          className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
          style={{
            height: "86px",
            padding: "10px",
          }}
        >
          <iframe
            ref={iframeRef}
            className="h-[80px] w-full border-0"
            style={{
              height: "40px",
            }}
          />
          <div className="absolute top-[50px] flex flex-col items-center">
            <div className="flex items-center gap-1">
              {inputText ? (
                <>
                  <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">return</span>
                  </kbd>
                  <span className="text-sm">to make change</span>
                </>
              ) : (
                <>
                  <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">esc</span>
                  </kbd>
                  <span className="text-sm">to close</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
