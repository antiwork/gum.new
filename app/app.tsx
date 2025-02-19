"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Loader } from "@/components/ui/loader";
import Logo from "./components/Logo";
import { signIn } from "next-auth/react";

export type Product = {
  name: string;
  preview_url: string | null;
  description: string | null;
  customizable_price: boolean;
  require_shipping: boolean;
  custom_receipt: string | null;
  custom_permalink: string | null;
  subscription_duration: string | null;
  id: string;
  url: string | null;
  price: number;
  currency: string;
  short_url: string;
  thumbnail_url: string | null;
  tags: string[];
  formatted_price: string;
  published: boolean;
  file_info: Record<string, any>;
  max_purchase_count: number | null;
  deleted: boolean;
  custom_fields: any[];
  custom_summary: string | null;
  is_tiered_membership: boolean;
  recurrences: string[] | null;
  variants: Variant[];
  purchasing_power_parity_prices: { [country: string]: number };
};

export type Variant = {
  title: string;
  options: Option[];
};

export type Option = {
  name: string;
  price_difference: number;
  is_pay_what_you_want: boolean;
  recurrence_prices: RecurrencePrices | null;
  url: string | null;
};

export type RecurrencePrices = {
  [recurrence: string]: {
    price_cents: number;
    suggested_price_cents: number | null;
  };
};

export default function App({ isAuthenticated, products }: { isAuthenticated: boolean; products: Product[] }) {
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState<"initial" | "generating" | "finished">("initial");
  const [selectedProduct, setSelectedProduct] = useState(products?.[0]?.id || "");
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [newProductDetails, setNewProductDetails] = useState("");
  const defaultText = "a landing page";
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

    const messages = [
      {
        content: `Make ${about}`,
        productInfo: JSON.stringify(
          isNewProduct ? newProductDetails : (products?.find((p) => p.id === selectedProduct) ?? ""),
        ),
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
      setStatus("finished");
      setTimeout(() => {
        window.location.href = `/gum/${id}`;
      }, 1000);
    } catch (error) {
      console.error("Error generating content:", error);
      setStatus("initial");
    }
  };

  const loggedInContent = (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f0] dark:bg-black dark:text-white">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      {status !== "initial" ? <Loader isDoneLoading={status === "finished"} /> : null}
      <form
        onSubmit={handleSubmit}
        className="font-['Helvetica Neue',Helvetica,Arial,sans-serif] absolute top-1/2 left-1/2 z-10 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 px-4 text-3xl leading-2 font-bold text-black sm:w-[calc(100%-4rem)] sm:text-4xl md:max-w-[61%] md:text-5xl lg:text-6xl dark:text-white italic"
        style={{ lineHeight: "150%" }}
      >
        I want to make
        <textarea
          ref={inputRef}
          name="about"
          placeholder="..."
          className="mt-2 block w-full resize-none rounded-[20px] border-4 border-black px-4 py-4 text-3xl sm:px-6 sm:py-6 sm:text-4xl md:text-5xl lg:text-6xl dark:border-white dark:text-black"
          value={about}
          style={{
            backgroundColor: "rgba(255, 144, 232)",
            minHeight: "150px",
            paddingTop: "18px",
            paddingBottom: "18px",
          }}
          onChange={(e) => setAbout(e.target.value)}
        />
        {products && products.length > 0 && (
          <>
            <div className="mt-8 text-6xl italic">to sell</div>
            <div className="relative">
              {!isNewProduct ? (
                <>
                  <select
                    name="product"
                    value={selectedProduct}
                    onChange={(e) => {
                      if (e.target.value === "new") {
                        setIsNewProduct(true);
                      } else {
                        setSelectedProduct(e.target.value);
                      }
                    }}
                    className="mt-4 block w-full appearance-none rounded-[20px] border-4 border-black px-4 py-4 text-3xl sm:px-6 sm:py-6 sm:text-4xl md:text-5xl lg:text-6xl dark:border-white dark:text-black"
                    style={{
                      backgroundColor: "rgba(255, 201, 0)",
                    }}
                  >
                    {products.map((product: Product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                    <option value="new">A totally new product</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
                    <svg className="h-12 w-12 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </>
              ) : (
                <input
                  type="text"
                  name="newProduct"
                  value={newProductDetails}
                  onChange={(e) => setNewProductDetails(e.target.value)}
                  placeholder="a $50 course with 10 seats on developing with devin"
                  className="mt-4 block w-full appearance-none rounded-[20px] border-4 border-black px-6 py-6 text-6xl dark:border-white dark:text-black"
                  style={{
                    backgroundColor: "rgba(255, 201, 0)",
                  }}
                  autoFocus
                />
              )}
            </div>
          </>
        )}
        <Button
          type="submit"
          variant="outline"
          className="mt-8 w-full cursor-pointer rounded-full border-4 border-black bg-black p-4 text-2xl font-bold text-white transition-colors hover:bg-white hover:text-black sm:p-6 sm:text-3xl md:p-8 md:text-4xl lg:text-5xl dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
          disabled={status !== "initial"}
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
            className="relative z-10 cursor-pointer rounded-full border-4 border-black bg-white p-4 text-2xl font-bold text-black transition-colors hover:bg-black hover:text-white sm:p-6 sm:text-3xl md:p-8 md:text-4xl lg:text-5xl dark:border-white"
          >
            Login with Gumroad
          </Button>
        </div>
      )}
    </div>
  );
}
