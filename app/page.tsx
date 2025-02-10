"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [about, setAbout] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [landingPage, setLandingPage] = useState("");
  const defaultText = "a landing page to sell a digital product on ";
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedAbout = localStorage.getItem("about") || defaultText;
    setAbout(savedAbout);

    let index = 0;
    let typeInterval: NodeJS.Timeout;

    const type = () => {
      if (index < defaultText.length) {
        setAbout(defaultText.slice(0, index + 1));
        index++;
        typeInterval = setTimeout(type, Math.random() * 20 + 20); // Random delay each iteration
      } else {
        // Focus and move cursor to end after typing animation
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(
            defaultText.length,
            defaultText.length
          );
        }
      }
    };

    typeInterval = setTimeout(type, Math.random() * 100 + 30);

    return () => clearTimeout(typeInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const messages = [
      {
        content: `Make ${formData.get("about")}`,
      },
    ];

    setIsGenerating(true);

    console.log("STARTING");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      });

      const [newLandingPage] = await response.json();
      console.log("SUCCESS");
      console.log(newLandingPage);
      setLandingPage(newLandingPage);
      const resultDiv = document.getElementById("results") as HTMLDivElement;
      resultDiv.innerHTML = newLandingPage;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div
        id="results"
        className="w-full h-screen p-4 text-lg font-normal absolute top-0 left-0"
        dangerouslySetInnerHTML={{ __html: landingPage }}
      />
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
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold px-8 w-full max-w-[61%] sm:w-[calc(100%-4rem)] leading-2 text-black dark:text-white font-['Helvetica Neue',Helvetica,Arial,sans-serif]"
        style={{ lineHeight: "150%" }}
      >
        I want to make
        <textarea
          ref={inputRef}
          name="about"
          placeholder="..."
          className="block w-full mt-2 text-6xl rounded-[20px] border-4 dark:text-black dark:border-white border-black dark:border-white py-6 px-6 resize-none"
          value={about}
          style={{
            backgroundColor: "rgba(255, 144, 232)",
            minHeight: "150px",
            paddingTop: "18px",
            paddingBottom: "18px",
          }}
          onChange={(e) => {
            setAbout(e.target.value);
            localStorage.setItem("about", e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="outline"
          className="text-5xl mt-8 font-bold p-8 w-full rounded-full border-4 border-black dark:border-white bg-black dark:bg-black text-white dark:text-white hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
          disabled={isGenerating}
        >
          {isGenerating ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
