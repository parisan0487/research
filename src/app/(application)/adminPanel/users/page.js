"use client";

import MiniLoading from "@/component/layout/loading/MiniLoading";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [deletingUserId, setDeletingUserId] = useState(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://researchback.onrender.com/api/users/getAll", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("خطا در دریافت کاربران", err);
        } finally {
            setLoading(false);
        }
    };


    const updateRole = async (id, newRole) => {
        setUpdatingUserId(id);
        try {
            const token = localStorage.getItem("token");
            await fetch(`https://researchback.onrender.com/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole }),
            });
            await fetchUsers();
        } catch (err) {
            console.error("خطا در تغییر نقش:", err);
        } finally {
            setUpdatingUserId(null);
        }
    };


    const deleteUser = async (id) => {
        if (!confirm("آیا از حذف کاربر مطمئن هستید؟")) return;
        setDeletingUserId(id);
        try {
            const token = localStorage.getItem("token");
            await fetch(`https://researchback.onrender.com/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            await fetchUsers();
        } catch (err) {
            console.error("خطا در حذف کاربر:", err);
        } finally {
            setDeletingUserId(null);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="space-y-6 p-4" dir="rtl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-[#00786b]">مدیریت کاربران</h1>
            </div>

            {loading ? (
                <MiniLoading />
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-[#e0f7f4] text-[#00786b]">
                            <tr>
                                <th className="text-right py-3 px-4 font-semibold">نام</th>
                                <th className="text-right py-3 px-4 font-semibold">شماره</th>
                                <th className="text-right py-3 px-4 font-semibold">نقش</th>
                                <th className="text-right py-3 px-4 font-semibold">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-[#f0fdfa] transition duration-150"
                                >
                                    <td className="py-2 px-4 font-bold text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="py-2 px-4 text-gray-700">{user.phone}</td>
                                    <td className="py-2 px-4 text-gray-800 font-semibold">
                                        {user.role === "admin" ? "ادمین" : "کاربر"}
                                    </td>
                                    <td className="py-2 px-4 flex gap-3">
                                        <button
                                            onClick={() =>
                                                updateRole(
                                                    user._id,
                                                    user.role === "admin" ? "user" : "admin"
                                                )
                                            }
                                            className="text-[#00786b] hover:underline font-medium"
                                        >
                                            {updatingUserId === user._id ? "در حال تغییر..." : "تغییر نقش"}
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="text-red-600 hover:underline font-medium"
                                        >
                                           {deletingUserId === user._id ? "در حال حذف..." : "حذف"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
