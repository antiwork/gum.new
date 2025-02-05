"use client";

export default function Home() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const messages = [
      {
        content: `I want to make a ${formData.get("type")} ${formData.get(
          "format"
        )} to sell ${formData.get("product")} in ${formData.get("location")}`,
      },
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        model: "claude-3-5-sonnet-20241022",
      }),
    });

    const landingPage = await response.json();
    console.log(landingPage);
    const textarea = document.getElementById("results") as HTMLTextAreaElement;
    textarea.value = landingPage;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <textarea
        id="results"
        className="w-full h-screen p-4 text-lg font-normal"
        readOnly
        placeholder="What are you making?"
      />

      <form
        onSubmit={handleSubmit}
        className="absolute top-0 left-0 z-10 flex flex-col gap-2 text-4xl font-bold p-4"
      >
        <div>I want to make a</div>
        <select name="type" className="rounded-lg border p-2 text-4xl">
          <option>modern</option>
          <option>trendy</option>
          <option>artisanal</option>
          <option>boutique</option>
        </select>
        <select name="format" className="rounded-lg border p-2 text-4xl">
          <option>newsletter</option>
          <option>blog</option>
          <option>website</option>
          <option>platform</option>
        </select>
        <div>to sell</div>
        <select name="product" className="rounded-lg border p-2 text-4xl">
          <option>coffee</option>
          <option>tea</option>
          <option>pastries</option>
          <option>beverages</option>
        </select>
        <div>in</div>
        <select name="location" className="rounded-lg border p-2 text-4xl">
          <option>NYC</option>
          <option>Brooklyn</option>
          <option>Manhattan</option>
          <option>Queens</option>
        </select>
        <div className="text-5xl">:)</div>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600"
        >
          Generate Ideas
        </button>
      </form>
    </div>
  );
}
