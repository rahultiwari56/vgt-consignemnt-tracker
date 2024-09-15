"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Validator() {
  const router = useRouter();

  useEffect(() => {

    // Debugging

    // If user data doesn't exist or is invalid, redirect to login page unless already on login page
    const userData = JSON.parse(localStorage.getItem("user") || "false");
    if (!userData && !window.location.pathname.includes("login")) {
      router.push("/login");
    }
    else{
        router.push("/");
    }
    
  }, [router]);

  return null;
}
