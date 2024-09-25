import LoginForm from "@/components/login/loginForm";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home() {
  // Use getSession for checking session on a page
  const session = await getSession();

  if (session) {
    // If user is authenticated, redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
}
