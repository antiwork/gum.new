"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { redirect } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import Logo from "./components/Logo";
import { signIn } from "next-auth/react";

export default function App({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState<"initial" | "generating" | "finished">(
    "initial"
  );
  const defaultText = "a landing page to sell a digital product on ";
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

    setStatus("generating");

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

      const { id } = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      redirect(`/gum/${id}`);
    } catch (error) {
      console.error("Error generating content:", error);
      setStatus("initial");
    } finally {
      setStatus("finished");
    }
  };

  const loggedInContent = (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      {status !== "initial" ? (
        <Loader isDoneLoading={status === "finished"} />
      ) : null}
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
          onChange={(e) => setAbout(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          className="mt-8 w-full cursor-pointer rounded-full border-4 border-black bg-black p-8 text-5xl font-bold text-white transition-colors hover:bg-white hover:text-black dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
          disabled={status === "generating"}
        >
          {status === "generating" ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="relative">
      <div className={`${!isAuthenticated ? "opacity-80 blur-sm" : ""}`}>{loggedInContent}</div>
      {!isAuthenticated && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[rgba(255,144,232,0.8)] backdrop-blur-sm" />
          <Button
            onClick={() => signIn("gumroad")}
            className="relative z-10 cursor-pointer rounded-full border-4 border-black bg-white p-8 text-5xl font-bold text-black transition-colors hover:bg-black hover:text-white dark:border-white"
          >
            Login with Gumroad
          </Button>
        </div>
      )}
    </div>
  );
}
