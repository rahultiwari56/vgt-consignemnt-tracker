"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../register/registerForm.module.css";

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
    <div className={styles.containerWrap}>
      <div className={styles.container}>
        <div className={styles.heading}>Sign In</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            required
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input className={styles.loginButton} type="submit" value="Sign In" />
        </form>
        {isLoading && <div className={styles.loader}>Signing in...</div>}{" "}
        {/* Loader */}
        {error && <p className={styles.errorMessage}>{error}</p>}{" "}
        {/* Error message */}
        <Link className={styles.agreement} href="/register">
          Don’t have an account?{" "}
          <span className={styles.underline}>Register</span>
        </Link>
      </div>
    </div>
  );
}
