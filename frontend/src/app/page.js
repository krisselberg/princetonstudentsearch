"use client";

import React, { useContext } from "react";
import Search from "@/app/Search";
import Link from "next/link";
import { AuthContext } from "@/lib/firebase/AuthContext";
import SignIn from "./sign-in/page";
import logout from "@/lib/firebase/auth/logout";

export default function Home() {
  const { user } = useContext(AuthContext); // Access authentication data
  console.log(user);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="page-container relative">
      <div className="absolute top-4 right-4">
        <button onClick={logout} className="button">
          Log Out
        </button>
      </div>
      <img className="logo" src="/images/ptonlogo.png" alt="Princeton Logo" />
      <h1 className="header mb-6">Princeton Student Search</h1>
      <Search />
      <Link href="/add-student" className="mt-2 button">
        Add Student
      </Link>
    </div>
  );
}
