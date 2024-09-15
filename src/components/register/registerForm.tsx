"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loader

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loader on form submission
    setError(""); // Clear any previous errors

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      setLoading(false); // Hide loader if validation fails
      return;
    }

    try {
      console.log("Form submission started");

      // Check if user already exists
      const userExistsResponse = await axios.post('/api/userExists', { email }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (userExistsResponse.data.user) {
        setError("User already exists.");
        setLoading(false); // Hide loader when showing error message
        return;
      }

      // Register the new user
      const response = await axios.post('/api/register', { name, email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        alert('User registered successfully');
        router.push("/");
      } else {
        setError('User registration failed: ' + response.data.message || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error.message || error);
      setError('Error submitting form');
    } finally {
      setLoading(false); // Hide loader after form submission completes
    }
  };

  return (
    <div className="container">
      <div className="heading">Sign Up</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="name"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Conditionally render the loader, error, or submit button */}
        {loading ? (
          <div className="loader">Signing up...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <input className="login-button" type="submit" value="Sign Up" />
        )}
      </form>

      <Link className="text-sm mt-3 text-right" href={"/"}>
        Already have an account? <span className="underline">Login</span>
      </Link>
    </div>
  );
}
