"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { redirect } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import Logo from "./components/Logo";

export default function Home() {
  const [about, setAbout] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const defaultText = "a landing page to sell a digital product on ";
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
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
          inputRef.current.setSelectionRange(defaultText.length, defaultText.length);
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

    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      });

      const { id } = await response.json();
      redirect(`/gum/${id}`);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      {isLoading ? <Loader /> : null}
      <form
        onSubmit={handleSubmit}
        className="font-['Helvetica Neue',Helvetica,Arial,sans-serif] absolute top-1/2 left-1/2 z-10 w-full max-w-[61%] -translate-x-1/2 -translate-y-1/2 px-8 text-6xl leading-2 font-bold text-black sm:w-[calc(100%-4rem)] dark:text-white"
        style={{ lineHeight: "150%" }}
      >
        I want to make
        <textarea
          ref={inputRef}
          name="about"
          placeholder="..."
          className="mt-2 block w-full resize-none rounded-[20px] border-4 border-black px-6 py-6 text-6xl dark:border-white dark:text-black"
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
          className="mt-8 w-full cursor-pointer rounded-full border-4 border-black bg-black p-8 text-5xl font-bold text-white transition-colors hover:bg-white hover:text-black dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
          disabled={isGenerating}
        >
          {isGenerating ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
