// src/pages/signin.js or src/app/signin/page.js
"use client";
import { useState } from "react";
import signIn from "@/lib/firebase/auth/signin";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    }
    if (result) {
      console.log("Signed in successfully");
      router.push("/");
    }
  };

  return (
    <div className="page-container">
      <img className="logo" src="/images/ptonlogo.png" alt="Princeton Logo" />
      <h1 className="header mb-6">Sign In</h1>
      <form onSubmit={handleSignIn} className="max-w-sm">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-form"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-form"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="button w-full">
          Sign In
        </button>
      </form>
    </div>
  );
}
