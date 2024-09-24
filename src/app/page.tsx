import LoginForm from "@/components/login/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/login"); // Redirect to dashboard if already logged in

  return (
    <main>
      <LoginForm />
    </main>
  );
}