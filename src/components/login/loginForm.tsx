"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './loginForm.css';

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader state

  const { status } = useSession(); // Track session status
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Start loading

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials");
        setIsLoading(false); // Stop loading
        return;
      }

      // Redirect to the protected page after login
      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      setIsLoading(false); // Stop loading
    }
  };

  if (status === "authenticated") {
    router.push("/dashboard"); // Redirect if already authenticated
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className="container">
        <div className="heading">Sign In</div>
        <form onSubmit={handleSubmit} className="form">
          <input
            required
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input className="login-button" type="submit" value="Sign In" />
        </form>

        {isLoading && <div className="loader">Signing in...</div>} {/* Loader */}

        {error && <p className="error-message">{error}</p>} {/* Error message */}

        <Link className="agreement" href="/register">
          Don’t have an account? <span className="underline">Register</span>
        </Link>
      </div>
    </div>
  );
}
