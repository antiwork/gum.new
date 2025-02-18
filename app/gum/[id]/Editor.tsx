"use client";

import { useState, useRef, useEffect } from "react";

async function updateElement(
  text: string,
  element: {
    html: string;
    tagName: string;
    textContent: string;
  } | null,
  fullHtml: string,
  gumId: string,
) {
  // Only process element if it exists
  let elementData = element
    ? {
        ...element,
        html: element.html,
      }
    : null;

  // If element is null, we're editing the whole page
  if (!element) {
    elementData = {
      html: fullHtml,
      tagName: "div",
      textContent: document.body.textContent || "",
    };
  }

  const response = await fetch("/api/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      element: elementData,
      fullHtml,
      gumId,
    }),
  });

  const data = await response.json();
  return data.html;
}

export default function Editor({ initialHtml, gumId }: { initialHtml: string; gumId: string }) {
  // const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editState, setEditState] = useState<"idle" | "loading" | "typing">("idle");
  const inputValueRef = useRef("");

  const resultsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Add state to track the current HTML
  const [currentHtml, setCurrentHtml] = useState(initialHtml);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    setEditState("typing");
  };

  // Add hover and click handlers for content elements
  useEffect(() => {
    if (!resultsRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (editState !== "idle") return;

      // Get the element under cursor
      const elements = document.elementsFromPoint(e.clientX, e.clientY);

      // Find the first content element under the cursor within our results container
      const contentElement = elements.find((el) => {
        if (!(el instanceof HTMLElement)) return false;
        if (!resultsRef.current?.contains(el)) return false;
        return ["DIV", "H1", "H2", "P", "BUTTON", "A", "LI"].includes(el.tagName);
      }) as HTMLElement | undefined;

      if (!resultsRef.current) return;

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
      if (editState !== "idle") return;
      setEditState("typing");
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const contentElement = elements.find((el) => {
        if (!(el instanceof HTMLElement)) return false;
        if (!resultsRef.current?.contains(el)) return false;
        return ["DIV", "H1", "H2", "H3", "H4", "H5", "H6", "P", "BUTTON", "A", "LI"].includes(el.tagName);
      }) as HTMLElement | undefined;
      if (!contentElement) return;
      e.preventDefault();

      // Create a clone of the element with the style tag since the styles aren't shown in the UI
      const cleanElement = contentElement.cloneNode(true) as HTMLElement;
      cleanElement.removeAttribute("style");
      setSelectedElement(cleanElement);
      contentElement.style.outline = "2px solid rgb(255, 144, 232)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [editState, selectedElement]);

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

  // Handle keyboard shortcuts if the input isn't focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle window shortcuts when iframe is not focused
      const iframeInput = iframeRef.current?.contentDocument?.querySelector("input");
      if (iframeInput === document.activeElement) return;

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setEditState("typing");
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setEditState("idle");
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

  // Update handleInputKeyDown
  const handleInputKeyDown = async (e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement;

    inputValueRef.current = input.value;

    if (e.key !== "Enter" || !inputValueRef.current) return;
    e.preventDefault();
    if (!resultsRef.current) return;

    try {
      setIsLoading(true);
      console.log("Making change:", {
        text: inputValueRef.current,
        element: selectedElement
          ? {
              html: selectedElement.outerHTML,
              tagName: selectedElement.tagName,
              textContent: selectedElement.textContent || "",
            }
          : null,
        fullHtml: resultsRef.current.innerHTML,
      });

      const updatedHtml = await updateElement(
        inputValueRef.current,
        selectedElement
          ? {
              html: selectedElement.outerHTML,
              tagName: selectedElement.tagName,
              textContent: selectedElement.textContent || "",
            }
          : null,
        resultsRef.current.innerHTML,
        gumId,
      );

      setCurrentHtml(updatedHtml);

      setEditState("idle");
      input.value = "";
      inputValueRef.current = "";
      setSelectedElement(null);
    } catch (error) {
      console.error("Failed to update element:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update iframe useEffect
  useEffect(() => {
    if (editState === "idle" || !iframeRef.current) return;
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
              padding: 8px;
              border: none;
              outline: none;
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
    input.focus();

    // Add input event listener to track value changes
    const handleInput = (e: Event) => {
      inputValueRef.current = (e.target as HTMLInputElement).value;
    };

    // Handle keyboard shortcuts in the iframe
    const handleIframeKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setEditState("idle");
        // Remove focus from any active element
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
      handleInputKeyDown(e);
    };

    input.addEventListener("input", handleInput);
    input.addEventListener("keydown", handleIframeKeyDown);

    return () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("keydown", handleIframeKeyDown);
    };
  }, [editState, selectedElement]);

  // Add selection change listener
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen bg-[#f4f4f0] dark:bg-black dark:text-white">
        <div ref={resultsRef} className="relative min-h-screen w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: currentHtml,
            }}
          />
        </div>

        {editState === "idle" && (
          <div className="fixed right-0 bottom-2 left-0 flex">
            <div className="mx-auto flex transform items-center gap-1 rounded-full bg-white px-4 py-2 text-sm text-gray-500 shadow-lg dark:bg-gray-800">
              <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100">
                ⌘
              </kbd>
              <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100">
                K
              </kbd>
              <span>
                or <span style={{ backgroundColor: "rgb(255, 144, 232)", color: "black" }}>Highlight</span> or <span style={{ color: "black" }}>Click</span> to make changes
              </span>
            </div>
          </div>
        )}

        {editState === "typing" && (
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
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="relative h-5 w-5">
                      <img
                        src="/icon.png"
                        alt="Loading..."
                        className="h-full w-full animate-spin"
                        style={{ animationDuration: "1s" }}
                      />
                    </div>
                    <span className="text-sm">Making changes...</span>
                  </div>
                ) : inputValueRef.current ? (
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
    </>
  );
}
