import App from "./app";
import { auth } from "@/auth";
import db from "@/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gum.new",
  description: "Gum.new is a platform for creating and sharing Gumroad pages.",
  openGraph: {
    title: "Gum.new",
    description: "Gum.new is a platform for creating and sharing Gumroad pages.",
    images: [
      {
        url: "/thumb.png",
        width: 1200,
        height: 630,
        alt: "Gum.new",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gum.new",
    description: "Gum.new is a platform for creating and sharing Gumroad pages.",
    images: ["/thumb.png"],
  },
};

export default async function Home() {
  const session = await auth();
  let products = null;

  if (session) {
    // Look up the current user's Gumroad account to retrieve the access token
    const account = await db.query.accounts.findFirst({
      where: (acc, { eq, and }) => and(eq(acc.userId, session.user.id), eq(acc.provider, "gumroad")),
    });

    if (account && account.access_token) {
      const gumroadUrl = `https://api.gumroad.com/v2/products?access_token=${account.access_token}`;
      const res = await fetch(gumroadUrl, { method: "GET" });
      products = (await res.json()).products;
    }
  }

  return <App isAuthenticated={!!session} products={products} />;
}
