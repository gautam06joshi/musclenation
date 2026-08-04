"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { query, where, getDocs } from "firebase/firestore";

export default function AddMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("1");
  const [fees, setFees] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  const [feesPending, setFeesPending] = useState("");

  const handleSubmit = async () => {
  try {
    // 🔍 CHECK IF EMAIL EXISTS IN FIRESTORE
    const q = query(
      collection(db, "members"),
      where("email", "==", email)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("User already exists ❌");
      return;
    }

    const defaultPassword = "123456";

    // 🔐 CREATE AUTH USER
    await createUserWithEmailAndPassword(auth, email, defaultPassword);
    console.log("Current user:", auth.currentUser);

    // 📅 membership
    const durationMap: any = {
      "1": 30,
      "3": 90,
      "6": 180,
      "12": 365,
    };

    const days = durationMap[plan];

    const joinDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(joinDate.getDate() + days);

    // 💾 SAVE DATA
    await addDoc(collection(db, "members"), {
      name,
      email,
      phone,
      feesAmount: Number(fees),
      feesPending: Number(feesPending || 0),
      feesPaid: Number(feesPending) === 0,
      joinDate: joinDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    });

    alert("Member created successfully ✅");

  } catch (err: any) {
    if (err.code === "auth/email-already-in-use") {
      alert("Email already registered in Auth ❌");
    } else {
      alert(err.message);
    }
  }
};

  return (
  <div className="min-h-screen px-6 py-10 bg-white text-black dark:bg-black dark:text-white transition-colors">

    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-2xl font-semibold">Add Member</h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Create a new gym member account
      </p>
    </div>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT: FORM */}
      <div className="lg:col-span-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 transition-colors">

        <div className="flex flex-col gap-4">

          <input
            className="p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 outline-none"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 outline-none"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 outline-none"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
          </select>

          <input
            className="p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            placeholder="Total Fees"
            onChange={(e) => setFees(e.target.value)}
          />

          <input
            className="p-3 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            placeholder="Pending Fees"
            onChange={(e) => setFeesPending(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white dark:bg-white dark:text-black py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Add Member
          </button>

        </div>
      </div>

      {/* RIGHT: PREMIUM PREVIEW */}
      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 h-fit transition-colors">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm text-neutral-500 dark:text-neutral-400">
            Member Preview
          </h2>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              Number(feesPending || 0) === 0
                ? "bg-green-500/10 text-green-500 dark:text-green-400"
                : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
            }`}
          >
            {Number(feesPending || 0) === 0 ? "Paid" : "Pending"}
          </span>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-semibold text-lg">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </div>

          <div>
            <p className="text-base font-medium">
              {name || "Member Name"}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {email || "email@example.com"}
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 my-4" />

        {/* DETAILS */}
        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">Phone</span>
            <span>{phone || "--"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">Plan</span>
            <span>{plan} Month(s)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">Total Fees</span>
            <span>₹{fees || 0}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">Pending</span>
            <span>₹{feesPending || 0}</span>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 my-4" />

        {/* FOOTER */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Membership will start immediately after creation.
        </p>

      </div>

    </div>
  </div>
);
}