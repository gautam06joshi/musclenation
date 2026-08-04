"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Typewriter } from "@/components/ui/auth-fuse";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      document.cookie = "firebaseAuth=true; path=/";
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid email or password ❌");
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Reset email sent 📩");
    } catch {
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-black text-white">

      {/* LEFT */}
      <div className="flex items-center justify-center p-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm bg-[#0a0a0a] p-8 rounded-xl border border-slate-800"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">
            Gym Admin Login
          </h2>

          <p className="text-sm text-slate-400 text-center mb-6">
            Manage your gym members efficiently
          </p>

          {/* ERROR */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* EMAIL */}
          <input
            className="w-full p-2 mb-4 bg-slate-900 rounded border border-slate-700"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 bg-slate-900 rounded border border-slate-700 pr-10"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* FORGOT */}
          <p
            onClick={handleForgotPassword}
            className="text-sm text-blue-400 cursor-pointer mb-4 hover:underline"
          >
            Forgot Password?
          </p>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex items-center justify-center bg-black relative">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-10"
        >
          <h2 className="text-3xl font-bold mb-4">
            <Typewriter
              text={[
                "Train Hard.",
                "Stay Consistent.",
                "No Excuses.",
              ]}
              speed={60}
              loop
            />
          </h2>

          <p className="text-slate-400 max-w-md">
            Discipline beats motivation.  
            Build your strongest version, one rep at a time 💪
          </p>
        </motion.div>
      </div>
    </div>
  );
}