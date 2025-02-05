"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
  const [style, setStyle] = useState("neobrutalist");
  const [purpose, setPurpose] = useState("sell a digital product");
  const [customStyle, setCustomStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [landingPage, setLandingPage] = useState("");
  const [about, setAbout] = useState("");
  const [newsletterUrl, setNewsletterUrl] = useState("");

  useEffect(() => {
    const savedStyle = localStorage.getItem("style") || "neobrutalist";
    const savedPurpose =
      localStorage.getItem("purpose") || "sell a digital product";
    const savedCustomStyle = localStorage.getItem("customStyle") || "";
    const savedAbout = localStorage.getItem("about") || "";
    const savedNewsletterUrl = localStorage.getItem("newsletterUrl") || "";

    setStyle(savedStyle);
    setPurpose(savedPurpose);
    setCustomStyle(savedCustomStyle);
    setAbout(savedAbout);
    setNewsletterUrl(savedNewsletterUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const styleToUse = style === "custom" ? customStyle : style;
    const messages = [
      {
        content: `I want to make a ${styleToUse} website to ${formData.get(
          "purpose"
        )}${
          purpose === "sell a digital product"
            ? ` about ${formData.get("about")}`
            : ` for ${formData.get("newsletter-url")}`
        }`,
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

  const getStyleClasses = () => {
    switch (style) {
      case "neobrutalist":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold p-8 w-[61%] leading-2",
          select:
            "rounded-full border-2 border-black mx-[18px] py-2 px-6 text-6xl inline-block",
          button:
            "text-6xl p-8 rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors w-full max-w-[120px]",
          createButton:
            "text-5xl p-8 rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors mt-4",
          input:
            "text-6xl rounded-full border-2 border-black py-0 px-6 inline-block mx-[18px]",
        };
      case "minimalist":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-light p-12 w-[61%] bg-white/80 backdrop-blur-sm",
          select:
            "rounded-sm border border-gray-200 mx-[18px] py-2 px-4 text-6xl shadow-sm inline-block",
          button:
            "text-4xl p-6 rounded-sm border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors w-full max-w-[120px] shadow-sm",
          createButton:
            "text-4xl p-6 rounded-sm border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors w-full mt-4 shadow-sm",
          input:
            "text-4xl rounded-sm border border-gray-200 py-2 px-4 shadow-sm inline-block mx-[18px]",
        };
      case "playful":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 gap-8 text-6xl font-bold p-10 w-[61%] rotate-1",
          select:
            "rounded-xl border-4 border-dashed border-purple-500 p-8 px-6 text-6xl bg-yellow-100 shadow-lg transform hover:rotate-1 transition-transform inline-block mx-[18px]",
          button:
            "text-6xl p-8 rounded-xl border-4 border-dashed border-green-500 bg-pink-100 text-purple-600 hover:bg-purple-100 hover:text-pink-600 transition-colors w-full max-w-[120px] transform hover:-rotate-3",
          createButton:
            "text-6xl p-8 rounded-xl border-4 border-dashed border-green-500 bg-pink-100 text-purple-600 hover:bg-purple-100 hover:text-pink-600 transition-colors w-full mt-4 transform hover:-rotate-3",
          input:
            "text-6xl rounded-xl border-4 border-dashed border-blue-500 p-8 px-6 bg-green-100 inline-block mx-[18px]",
        };
      case "corporate":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 gap-5 text-6xl font-semibold p-10 w-[61%] bg-gray-50",
          select:
            "rounded-md border border-gray-300 p-7 px-5 text-6xl bg-white shadow-md inline-block mx-[18px]",
          button:
            "text-4xl p-7 rounded-md border-none bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full max-w-[120px] shadow-md",
          createButton:
            "text-4xl p-7 rounded-md border-none bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full mt-4 shadow-md",
          input:
            "text-4xl rounded-md border border-gray-300 p-7 px-5 shadow-md inline-block mx-[18px]",
        };
      case "retro":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold p-10 w-[61%] bg-amber-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          select:
            "rounded-none border-2 border-black p-8 px-6 text-6xl bg-orange-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mx-[18px]",
          button:
            "text-6xl p-8 rounded-none border-2 border-black bg-teal-400 text-black hover:bg-teal-500 transition-colors w-full max-w-[120px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          createButton:
            "text-6xl p-8 rounded-none border-2 border-black bg-teal-400 text-black hover:bg-teal-500 transition-colors w-full mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          input:
            "text-6xl rounded-none border-2 border-black p-8 px-6 bg-rose-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mx-[18px]",
        };
      default:
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold p-8 w-[61%]",
          select:
            "rounded-full border-2 border-black p-8 px-6 text-6xl inline-block mx-[18px]",
          button:
            "text-6xl p-8 rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors w-full max-w-[120px]",
          createButton:
            "text-6xl p-8 rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors w-full mt-4",
          input:
            "text-6xl rounded-full border-2 border-black p-8 px-6 inline-block mx-[18px]",
        };
    }
  };

  const styleClasses = getStyleClasses();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        id="results"
        className="w-full h-screen p-4 text-lg font-normal absolute top-0 left-0"
        dangerouslySetInnerHTML={{ __html: landingPage }}
      />

      <form
        onSubmit={handleSubmit}
        className={styleClasses.form}
        style={{ lineHeight: "150%" }}
      >
        I want to make a
        <Select
          name="style"
          value={style}
          onValueChange={(value) => {
            setStyle(value);
            localStorage.setItem("style", value);
          }}
        >
          <SelectTrigger className={styleClasses.select}>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neobrutalist">neobrutalist</SelectItem>
            <SelectItem value="minimalist">minimalist</SelectItem>
            <SelectItem value="playful">playful</SelectItem>
            <SelectItem value="corporate">corporate</SelectItem>
            <SelectItem value="retro">retro</SelectItem>
            <SelectItem value="custom">custom style</SelectItem>
          </SelectContent>
        </Select>
        {style === "custom" && (
          <Input
            type="text"
            name="custom-style"
            placeholder="e.g. christmas-themed"
            className={styleClasses.input}
            value={customStyle}
            onChange={(e) => {
              setCustomStyle(e.target.value);
              localStorage.setItem("customStyle", e.target.value);
            }}
          />
        )}
        website to
        <Select
          name="purpose"
          value={purpose}
          onValueChange={(value) => {
            setPurpose(value);
            localStorage.setItem("purpose", value);
          }}
        >
          <SelectTrigger
            className={styleClasses.select}
            style={{
              backgroundColor: "rgb(255, 144, 232)",
              marginInline: "18px",
            }}
          >
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sell a digital product">
              sell a digital product
            </SelectItem>
            <SelectItem value="collect emails">collect emails</SelectItem>
          </SelectContent>
        </Select>
        {purpose === "sell a digital product" && (
          <>
            about
            <Input
              type="text"
              name="about"
              placeholder="e.g. learning how to code with AI"
              className={styleClasses.input}
              value={about}
              style={{ backgroundColor: "#F1F333", marginInline: "18px" }}
              onChange={(e) => {
                setAbout(e.target.value);
                localStorage.setItem("about", e.target.value);
              }}
            />
          </>
        )}
        {purpose === "collect emails" && (
          <>
            for
            <Input
              type="text"
              name="newsletter-url"
              placeholder="e.g. https://newsletter.com"
              className={styleClasses.input}
              value={newsletterUrl}
              onChange={(e) => {
                setNewsletterUrl(e.target.value);
                localStorage.setItem("newsletterUrl", e.target.value);
              }}
            />
          </>
        )}
        :)
        <Button
          type="submit"
          variant="outline"
          className={styleClasses.createButton}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
