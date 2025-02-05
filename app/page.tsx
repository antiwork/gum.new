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
import Image from "next/image";
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
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold p-8 w-[61%] leading-2 text-black dark:text-white font-['Helvetica Neue',Helvetica,Arial,sans-serif]",
          select:
            "rounded-full border-2 border-black dark:text-black dark:border-white mx-[18px] py-2 px-6 text-6xl inline-block",
          button:
            "text-6xl p-8 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors w-full max-w-[120px] cursor-pointer",
          createButton:
            "text-5xl mt-20 p-8 w-full rounded-full border-2 border-black dark:border-white bg-black dark:bg-black text-white dark:text-white hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer",
          input:
            "text-6xl rounded-full border-2 dark:text-black dark:border-white border-black dark:border-white py-0 px-6 inline-block mx-[18px]",
        };
      case "minimalist":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-light p-12 w-[61%] bg-white/80 dark:bg-black/80 backdrop-blur-sm text-black dark:text-white font-['Helvetica Neue',Helvetica,Arial,sans-serif]",
          select:
            "rounded-sm border border-gray-200 dark:border-gray-700 mx-[18px] py-2 px-4 text-6xl shadow-sm inline-block",
          button:
            "text-4xl p-6 rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors w-full max-w-[120px] shadow-sm cursor-pointer",
          createButton:
            "text-4xl p-6 rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors w-full mt-4 shadow-sm cursor-pointer",
          input:
            "text-4xl rounded-sm border border-gray-200 dark:border-gray-700 py-2 px-4 shadow-sm inline-block mx-[18px]",
        };
      case "playful":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 gap-8 text-6xl font-bold p-10 w-[61%] rotate-1 text-black dark:text-white font-['Comic Sans MS',cursive]",
          select:
            "rounded-xl border-4 border-dashed border-purple-500 p-8 px-6 text-6xl bg-yellow-100 dark:bg-yellow-900 shadow-lg transform hover:rotate-1 transition-transform inline-block mx-[18px]",
          button:
            "text-6xl p-8 rounded-xl border-4 border-dashed border-green-500 bg-pink-100 dark:bg-pink-900 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-pink-600 dark:hover:text-pink-300 transition-colors w-full max-w-[120px] transform hover:-rotate-3 cursor-pointer",
          createButton:
            "text-6xl p-8 rounded-xl border-4 border-dashed border-green-500 bg-pink-100 dark:bg-pink-900 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-pink-600 dark:hover:text-pink-300 transition-colors w-full mt-4 transform hover:-rotate-3 cursor-pointer",
          input:
            "text-6xl rounded-xl border-4 border-dashed border-blue-500 p-8 px-6 bg-green-100 dark:bg-green-900 inline-block mx-[18px]",
        };
      case "corporate":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 gap-5 text-6xl font-semibold p-10 w-[61%] bg-gray-50 dark:bg-gray-900 text-black dark:text-white font-['Georgia',serif]",
          select:
            "rounded-md border border-gray-300 dark:border-gray-700 p-7 px-5 text-6xl bg-white dark:bg-gray-800 shadow-md inline-block mx-[18px]",
          button:
            "text-4xl p-7 rounded-md border-none bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors w-full max-w-[120px] shadow-md cursor-pointer",
          createButton:
            "text-4xl p-7 rounded-md border-none bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors w-full mt-4 shadow-md cursor-pointer",
          input:
            "text-4xl rounded-md border border-gray-300 dark:border-gray-700 p-7 px-5 shadow-md inline-block mx-[18px]",
        };
      case "retro":
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold p-10 w-[61%] bg-amber-100 dark:bg-amber-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-black dark:text-white font-['Courier New',monospace]",
          select:
            "rounded-none border-2 border-black dark:border-white p-8 px-6 text-6xl bg-orange-200 dark:bg-orange-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] inline-block mx-[18px]",
          button:
            "text-6xl p-8 rounded-none border-2 border-black dark:border-white bg-teal-400 dark:bg-teal-600 text-black dark:text-white hover:bg-teal-500 dark:hover:bg-teal-700 transition-colors w-full max-w-[120px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer",
          createButton:
            "text-6xl p-8 rounded-none border-2 border-black dark:border-white bg-teal-400 dark:bg-teal-600 text-black dark:text-white hover:bg-teal-500 dark:hover:bg-teal-700 transition-colors w-full mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer",
          input:
            "text-6xl rounded-none border-2 border-black dark:border-white p-8 px-6 bg-rose-200 dark:bg-rose-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] inline-block mx-[18px]",
        };
      default:
        return {
          form: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-6xl font-bold p-8 w-[61%] text-black dark:text-white font-['Helvetica Neue',Helvetica,Arial,sans-serif]",
          select:
            "rounded-full border-2 border-black dark:border-white p-8 px-6 text-6xl inline-block mx-[18px]",
          button:
            "text-6xl p-8 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors w-full max-w-[120px] cursor-pointer",
          createButton:
            "text-6xl p-8 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors w-full mt-4 cursor-pointer",
          input:
            "text-6xl rounded-full border-2 border-black dark:border-white p-8 px-6 inline-block mx-[18px]",
        };
    }
  };

  const styleClasses = getStyleClasses();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div
        id="results"
        className="w-full h-screen p-4 text-lg font-normal absolute top-0 left-0"
        dangerouslySetInnerHTML={{ __html: landingPage }}
      />
      <h1 className="font-bold z-11 absolute top-4 left-4 flex items-center">
        <svg width="49" height="14" viewBox="0 0 49 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white">
          <path d="M6.28808 13.6421C2.73904 13.6421 0.651367 10.7889 0.651367 7.23987C0.651367 3.55164 2.94781 0.559314 7.33192 0.559314C11.8552 0.559314 13.3862 3.62123 13.4558 5.36096H10.1851C10.1155 4.38671 9.28041 2.92534 7.26233 2.92534C5.10507 2.92534 3.71329 4.80425 3.71329 7.10069C3.71329 9.39713 5.10507 11.276 7.26233 11.276C9.21082 11.276 10.0459 9.74507 10.3938 8.21411H7.26233V6.96151H13.8333V13.3637H10.9506V9.32754C10.7418 10.7889 9.83712 13.6421 6.28808 13.6421Z" fill="currentColor"/>
          <path d="M19.678 13.6416C16.964 13.6416 15.2939 11.8323 15.2939 8.21362V0.767589H18.2166V8.21362C18.2166 10.0925 19.1213 10.9972 20.6522 10.9972C23.6445 10.9972 24.758 7.30896 24.758 4.73417V0.767589H27.6807V13.3632H24.8276V8.70074C24.2709 11.2755 22.7399 13.6416 19.678 13.6416Z" fill="currentColor"/>
          <path d="M45.1462 0.552246C42.6528 0.552246 41.0798 2.96106 40.5663 5.1883C40.4785 2.20353 39.0107 0.552246 36.6621 0.552246C34.6331 0.552246 32.7506 2.36173 32.2617 5.22434V0.766511H29.4125V13.3624H32.2982V8.84684C32.2982 7.72739 32.7649 3.13331 35.6699 3.13331C37.5517 3.13331 37.7479 4.83076 37.7479 7.15106V13.3624H40.6322V8.84684C40.6322 7.72739 41.1182 3.13331 44.0232 3.13331C45.9033 3.13331 46.0977 4.83076 46.0977 7.15106V13.3624H48.986V5.91202C48.9993 2.33773 47.7373 0.552246 45.1462 0.552246Z" fill="currentColor"/>
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
          <SelectTrigger
            className={styleClasses.select}
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              marginInline: "18px",
            }}
          >
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
              style={{
                backgroundColor: "#F1F333",
                marginInline: "18px",
              }}
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
          {isGenerating ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
