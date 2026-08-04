"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  expiryDate: string;
  feesPaid: boolean;
  feesAmount: number;
  feesPending: number;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Member>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const fetchMembers = async () => {
    const snapshot = await getDocs(collection(db, "members"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Member[];

    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "members", id));
    fetchMembers();
  };

  const markAsPaid = async (id: string) => {
    await updateDoc(doc(db, "members", id), {
      feesPending: 0,
      feesPaid: true,
    });
    fetchMembers();
  };

  const handleUpdate = async () => {
    if (!editingMember) return;

    await updateDoc(doc(db, "members", editingMember.id), {
      name: editingMember.name,
      email: editingMember.email,
      phone: editingMember.phone,
      feesAmount: editingMember.feesAmount,
      feesPending: editingMember.feesPending,
      feesPaid: editingMember.feesPending === 0,
    });

    setEditingMember(null);
    fetchMembers();
  };

  // 🔽 Sorting
  const sortedData = [...members].sort((a, b) => {
    let valueA: any = a[sortField];
    let valueB: any = b[sortField];

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // 🎯 Filter
  const filteredData = sortedData.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && m.feesPaid) ||
      (statusFilter === "pending" && !m.feesPaid);

    return matchesSearch && matchesStatus;
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Members</h1>

      {/* FILTERS */}
      <div className="flex gap-4">
        <input
          className="p-2 rounded bg-slate-100 dark:bg-slate-800 border"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-slate-100 dark:bg-slate-800 border"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border overflow-hidden">
  <table className="w-full text-sm table-fixed">

    {/* HEADER */}
    <thead className="bg-slate-100 dark:bg-slate-800 text-left">
      <tr>
        <th className="p-3 w-[15%]">Name</th>
        <th className="p-3 w-[25%]">Email</th>
        <th className="p-3 w-[15%]">Phone</th>
        <th className="p-3 w-[10%]">Fees</th>
        <th className="p-3 w-[10%]">Pending</th>
        <th className="p-3 w-[10%]">Status</th>
        <th className="p-3 w-[15%] text-center">Action</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {paginatedData.map((m) => (
        <tr key={m.id} className="border-t border-slate-200 dark:border-slate-800">

          <td className="p-3">{m.name}</td>
          <td className="p-3">{m.email}</td>
          <td className="p-3">{m.phone}</td>

          <td className="p-3">₹{m.feesAmount}</td>
          <td className="p-3">₹{m.feesPending}</td>

          {/* STATUS */}
          <td className="p-3">
            <span
              className={`px-2 py-1 rounded text-xs ${
                m.feesPaid
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {m.feesPaid ? "Paid" : "Pending"}
            </span>
          </td>

          {/* ACTION */}
          <td className="p-3">
            <div className="flex justify-center gap-2">

              <button
                onClick={() => setEditingMember(m)}
                className="bg-yellow-500 px-3 py-1 rounded text-white text-xs"
              >
                Edit
              </button>

              {!m.feesPaid && (
                <button
                  onClick={() => markAsPaid(m.id)}
                  className="bg-blue-600 px-3 py-1 rounded text-white text-xs"
                >
                  Pay
                </button>
              )}

              <button
                onClick={() => handleDelete(m.id)}
                className="bg-red-600 px-3 py-1 rounded text-white text-xs"
              >
                Delete
              </button>

            </div>
          </td>

        </tr>
      ))}
    </tbody>

  </table>
</div>

      {/* PAGINATION */}
      <div className="flex gap-2 items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded"
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded"
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">
              Edit Member
            </h2>

            <div className="flex flex-col gap-3">

              <input
                value={editingMember.name}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    name: e.target.value,
                  })
                }
                className="p-2 rounded bg-slate-100 dark:bg-slate-800"
              />

              <input
                value={editingMember.email}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    email: e.target.value,
                  })
                }
                className="p-2 rounded bg-slate-100 dark:bg-slate-800"
              />

              <input
                value={editingMember.phone}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    phone: e.target.value,
                  })
                }
                className="p-2 rounded bg-slate-100 dark:bg-slate-800"
              />

              <input
                type="number"
                value={editingMember.feesAmount}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    feesAmount: Number(e.target.value),
                  })
                }
                className="p-2 rounded bg-slate-100 dark:bg-slate-800"
              />

              <input
                type="number"
                value={editingMember.feesPending}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    feesPending: Number(e.target.value),
                  })
                }
                className="p-2 rounded bg-slate-100 dark:bg-slate-800"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingMember(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}