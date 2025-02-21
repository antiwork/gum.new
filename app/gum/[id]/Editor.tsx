"use client";

import { useState, useRef, useEffect, useCallback, RefObject } from "react";
import Image from "next/image";

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
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editState, setEditState] = useState<"idle" | "typing">("idle");
  const inputValueRef = useRef("");

  const resultsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

      if (e.key === "/") {
        e.preventDefault();
        setEditState("typing");
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setEditState("idle");
        setSelectedElement(null);
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

  const handleInputKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      const input = e.target as HTMLInputElement;

      inputValueRef.current = input.value;

      if (!inputValueRef.current) return;

      if (e.key === "Escape") {
        setEditState("idle");
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        return;
      }

      if (e.key !== "Enter") {
        setEditState("typing");
        return;
      }

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
    },
    [inputValueRef, resultsRef, selectedElement, setIsLoading, setEditState, setCurrentHtml, setSelectedElement, gumId],
  );

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
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              height: 100%;
            }
            textarea {
              width: 100%;
              min-height: 24px;
              font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
              font-size: inherit;
              padding: 8px;
              border: none;
              outline: none;
              resize: none;
              overflow: hidden;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <textarea rows="1" placeholder="/ to make changes"></textarea>
        </body>
      </html>
    `);
    iframeDoc.close();

    const textarea = iframeDoc.querySelector("textarea");
    if (!textarea) return;
    textarea.focus();

    const autoResize = () => {
      textarea.style.height = "24px";
      const heightNeeded = textarea.scrollHeight;
      textarea.style.height = `${heightNeeded}px`;
      iframeRef.current!.style.height = `${heightNeeded}px`;
    };

    // Add input event listener to track value changes and resize
    const handleInput = (e: Event) => {
      inputValueRef.current = (e.target as HTMLTextAreaElement).value;
      autoResize();
    };

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

    textarea.addEventListener("input", handleInput);
    textarea.addEventListener("keydown", handleIframeKeyDown);
    return () => {
      textarea.removeEventListener("input", handleInput);
      textarea.removeEventListener("keydown", handleIframeKeyDown);
    };
  }, [editState, selectedElement, handleInputKeyDown]);

  // Add selection change listener
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen bg-[#f4f4f0] dark:bg-black dark:text-white">
        <div ref={resultsRef} className="relative min-h-screen w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: currentHtml,
            }}
          />
        </div>
        <div className="fixed bottom-0 left-0 flex w-full pb-4">
          <CommandBar iFrameRef={iframeRef} editState={editState} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

function CommandBar({
  iFrameRef,
  editState,
  isLoading,
}: {
  iFrameRef: RefObject<HTMLIFrameElement | null>;
  editState: "idle" | "typing";
  isLoading: boolean;
}) {
  return (
    <div className="mx-auto flex w-1/2 min-w-md transform items-center justify-center gap-1 rounded-full bg-white px-6 py-2 text-sm text-gray-500 shadow-lg dark:bg-gray-800">
      <div className="relative flex flex-1 items-center justify-center">
        {editState === "typing" ? (
          <iframe
            ref={iFrameRef}
            style={{
              height: "40px",
              width: "100%",
            }}
          />
        ) : (
          <div className="flex h-[40px] w-full items-center justify-start pb-[2.5px] pl-[7px] select-none">
            <p className="font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif] text-[18px] font-medium text-gray-400">
              / to make changes
            </p>
          </div>
        )}
        <div
          className={`absolute bottom-1.5 left-[6px] h-0.5 w-[calc(100%-12px)] ${editState === "typing" ? "bg-[#ff90e8]" : "bg-gray-500"}`}
        ></div>
      </div>
      {isLoading ? (
        <div className="relative h-5 w-5">
          <Image
            src="/icon.png"
            alt="Loading..."
            width={20}
            height={20}
            className="h-full w-full animate-spin"
            style={{ animationDuration: "1s" }}
          />
        </div>
      ) : editState === "idle" ? (
        <span className="flex items-center gap-1">
          or <span style={{ backgroundColor: "rgb(255, 144, 232)", color: "black" }}>Highlight</span> or{" "}
          <span className="text-black dark:text-white">Click</span>
        </span>
      ) : editState === "typing" ? (
        <Kbd symbol="↵" />
      ) : null}
    </div>
  );
}

function Kbd({ symbol }: { symbol: string }) {
  return (
    <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100">
      {symbol}
    </kbd>
  );
}
