"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../components/Logo";

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
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState("");

  const resultsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    setIsEditing(true);
  };

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
    if (isEditing && iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
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
        if (input) {
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
                })
              );
            }
          });
        }
      }
    }
  }, [isEditing]);

  return (
    <div className="min-h-screen bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>

      <div ref={resultsRef} className="relative w-full min-h-screen p-4">
        <div dangerouslySetInnerHTML={{ __html: landingPage }} />
      </div>

      {!isEditing && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-sm text-gray-500">
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
            ⌘
          </kbd>
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
            K
          </kbd>
          <span>
            or{" "}
            <span
              style={{ backgroundColor: "rgb(255, 144, 232)", color: "black" }}
            >
              Highlight
            </span>{" "}
            to make changes
          </span>
        </div>
      )}

      {isEditing && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          style={{
            height: "86px",
            padding: "10px",
          }}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-[80px] border-0"
            style={{
              height: "40px",
            }}
          />
          <div className="absolute top-[50px] flex flex-col items-center">
            <div className="flex items-center gap-1">
              {inputText ? (
                <>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">return</span>
                  </kbd>
                  <span className="text-sm">to make change</span>
                </>
              ) : (
                <>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
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
