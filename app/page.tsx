import App from "./app";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  
  return <App isAuthenticated={!!session} />;
}
