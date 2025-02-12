
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { redirect } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import Logo from "./components/Logo";
import { signIn } from "next-auth/react";

export default function App({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [about, setAbout] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const defaultText = "a landing page to sell a digital product on ";
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let index = 0;
    let typeInterval: NodeJS.Timeout;

    const type = () => {
      if (index < defaultText.length) {
        setAbout(defaultText.slice(0, index + 1));
        index++;
        typeInterval = setTimeout(type, Math.random() * 20 + 20);
      } else {
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

  const loggedInContent = (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      {isLoading ? <Loader /> : null}
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
          className="block w-full mt-2 text-6xl rounded-[20px] border-4 dark:text-black dark:border-white border-black py-6 px-6 resize-none"
          value={about}
          style={{
            backgroundColor: "rgba(255, 144, 232)",
            minHeight: "150px",
            paddingTop: "18px",
            paddingBottom: "18px",
          }}
          onChange={(e) => {
            setAbout(e.target.value);
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

  return (
    <div className="relative">
      <div className={`${!isAuthenticated ? "opacity-80 blur-sm" : ""}`}>
        {loggedInContent}
      </div>
      {!isAuthenticated && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[rgba(255,144,232,0.8)] backdrop-blur-sm" />
          <Button
            onClick={() => signIn("gumroad")}
            className="cursor-pointer relative z-10 text-5xl font-bold p-8 rounded-full border-4 border-black dark:border-white bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            Login with Gumroad
          </Button>
        </div>
      )}
    </div>
  );
}
