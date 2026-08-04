"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

interface Member {
  feesPaid: boolean;
  feesAmount: number;
  joinDate: string;
  expiryDate: string;
}

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      const data = snapshot.docs.map(doc => doc.data() as Member);
      setMembers(data);
    };

    fetchData();
  }, []);

  // 📊 Calculations
  const totalMembers = members.length;

  const revenue = members.reduce((total, m) => {
    return m.feesPaid ? total + (m.feesAmount || 0) : total;
  }, 0);

  const thisMonth = new Date().getMonth();

  const joinedThisMonth = members.filter(m =>
    new Date(m.joinDate).getMonth() === thisMonth
  ).length;

  const expiringSoon = members.filter(m => {
    const daysLeft =
      (new Date(m.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24);

    return daysLeft <= 7 && daysLeft > 0;
  }).length;

  const cards = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: Users,
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      icon: DollarSign,
    },
    {
      title: "Joined This Month",
      value: joinedThisMonth,
      icon: TrendingUp,
    },
    {
      title: "Expiring Soon",
      value: expiringSoon,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-500 text-sm">
          Overview of your gym performance
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className="
                bg-white dark:bg-slate-900 
                border border-slate-200 dark:border-slate-800
                rounded-xl p-5
                shadow-sm hover:shadow-md transition
              "
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>
                <Icon className="h-5 w-5 text-slate-400" />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* EXTRA SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT PANEL */}
        <div className="
          bg-white dark:bg-slate-900 
          border border-slate-200 dark:border-slate-800 
          rounded-xl p-5
        ">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
            Recent Activity
          </h3>

          <p className="text-sm text-slate-500">
            Members joining and payments will appear here.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="
          bg-white dark:bg-slate-900 
          border border-slate-200 dark:border-slate-800 
          rounded-xl p-5
        ">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
            Quick Insights
          </h3>

          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Track member growth 📈</li>
            <li>• Monitor revenue 💰</li>
            <li>• Check expiring memberships ⏳</li>
          </ul>
        </div>

      </div>
    </div>
  );
}