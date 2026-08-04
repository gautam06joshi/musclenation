"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import TopStrip from "@/components/sections/TopStrip";
import Footer from "@/components/footer";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/account");
    } catch {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <>
    <TopStrip/>
    <Navbar/>
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-[#111] p-6 rounded-xl w-80">

        <h2 className="text-xl font-bold mb-4">User Login</h2>

        <input
          className="w-full p-2 mb-3 bg-slate-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 bg-slate-800 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
    <Footer/>
    </>
  );
}