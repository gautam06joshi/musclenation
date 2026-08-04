"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signOut, updatePassword } from "firebase/auth";
import TopStrip from "@/components/sections/TopStrip";
import Navbar from "@/components/navbar";

interface Member {
  name: string;
  email: string;
  phone: string;
  expiryDate: string;
  feesAmount: number;
  feesPending: number;
  feesPaid: boolean;
}

export default function AccountPage() {
  const [userEmail, setUserEmail] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
const [showPasswordInput, setShowPasswordInput] = useState(false);

const handleLogout = async () => {
  await signOut(auth);
  router.push("/user/login");
};

const handleChangePassword = async () => {
  try {
    if (!auth.currentUser) return;

    await updatePassword(auth.currentUser, newPassword);

    alert("Password updated ✅");
    setNewPassword("");
    setShowPasswordInput(false);

  } catch (err: any) {
    alert("Error: " + err.message);
  }
};
  // 🔐 CHECK LOGIN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/user/login"); // redirect if not logged in
      } else {
        setUserEmail(user.email || "");
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔍 FETCH USER DATA
  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) return;

      const q = query(
        collection(db, "members"),
        where("email", "==", userEmail)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data() as Member;
        setMember(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [userEmail]);

  // ⏳ CALCULATE DAYS LEFT
  const daysLeft = member
    ? Math.max(
        0,
        Math.ceil(
          (new Date(member.expiryDate).getTime() -
            new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  // 🌀 LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-black text-white px-8 py-30">

  {/* HEADER */}
  <div className="mb-10">
    <h1 className="text-2xl font-semibold">Overview</h1>
    <p className="text-sm text-neutral-400 mt-1">
      Your membership and billing details
    </p>
  </div>

  {member && (
    <>
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4">
          <p className="text-xs text-neutral-400">Total Fees</p>
          <p className="text-lg mt-1 font-medium">
            ₹{member.feesAmount}
          </p>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4">
          <p className="text-xs text-neutral-400">Paid</p>
          <p className="text-lg mt-1 font-medium">
            ₹{member.feesAmount - member.feesPending}
          </p>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4">
          <p className="text-xs text-neutral-400">Pending</p>
          <p className="text-lg mt-1 font-medium">
            ₹{member.feesPending}
          </p>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4">
          <p className="text-xs text-neutral-400">Status</p>
          <p className="text-lg mt-1 font-medium">
            {member.feesPaid ? "Paid" : "Pending"}
          </p>
        </div>

      </div>

      {/* MEMBERSHIP SECTION */}
      <div className="mb-10">

        <h2 className="text-sm text-neutral-400 mb-4">
          Membership
        </h2>

        <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-5">

          {/* PROGRESS */}
          <div className="mb-4">
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: `${Math.max(5, (daysLeft / 30) * 100)}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>{daysLeft} days remaining</span>
              <span>
                {new Date(member.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* DETAILS */}
      <div className="mb-10">

        <h2 className="text-sm text-neutral-400 mb-4">
          Personal Information
        </h2>

        <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg divide-y divide-neutral-800">

          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-neutral-400">Name</span>
            <span>{member.name}</span>
          </div>

          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-neutral-400">Email</span>
            <span>{member.email}</span>
          </div>

          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-neutral-400">Phone</span>
            <span>{member.phone}</span>
          </div>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">

        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 border border-neutral-700 rounded-md hover:bg-neutral-900 transition"
        >
          Logout
        </button>

        <button
          onClick={() => setShowPasswordInput(!showPasswordInput)}
          className="text-sm px-4 py-2 border border-neutral-700 rounded-md hover:bg-neutral-900 transition"
        >
          Change Password
        </button>

      </div>

      {/* PASSWORD INPUT */}
      {showPasswordInput && (
        <div className="mt-4 flex gap-2">

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-sm"
          />

          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-white text-black rounded-md text-sm"
          >
            Save
          </button>

        </div>
      )}

    </>
  )}

</div>
    </>
  );
}