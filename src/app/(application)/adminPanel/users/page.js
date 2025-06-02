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
        <div className="min-h-screen p-6" dir="rtl">
            <h1 className="mb-8 text-3xl font-extrabold text-[#00786b] drop-shadow-md">
                مدیریت کاربران
            </h1>

            {loading ? (
                <MiniLoading />
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg border border-[#00a693] bg-white">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-[#00a693] text-white select-none">
                            <tr>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">نام</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">شماره</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">نقش</th>
                                <th className="text-right py-4 px-6 font-semibold tracking-wider">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        هیچ کاربری یافت نشد
                                    </td>
                                </tr>
                            )}
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t border-gray-200 hover:bg-[#d4f5ef] transition-colors duration-200 cursor-pointer"
                                >
                                    <td className="py-3 px-6 font-semibold">{user.name}</td>
                                    <td className="py-3 px-6">{user.phone || "-"}</td>
                                    <td className="py-3 px-6 font-medium">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white ${user.role === "admin" ? "bg-green-600" : "bg-gray-400"
                                                }`}
                                        >
                                            {user.role === "admin" ? "ادمین" : "کاربر"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 flex gap-4">
                                        <button
                                            onClick={() =>
                                                updateRole(user._id, user.role === "admin" ? "user" : "admin")
                                            }
                                            disabled={updatingUserId === user._id}
                                            className={`text-[#00786b] font-semibold hover:underline transition ${updatingUserId === user._id ? "opacity-60 cursor-wait" : ""
                                                }`}
                                        >
                                            {updatingUserId === user._id ? "در حال تغییر..." : "تغییر نقش"}
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            disabled={deletingUserId === user._id}
                                            className={`text-red-600 font-semibold hover:underline transition ${deletingUserId === user._id ? "opacity-60 cursor-wait" : ""
                                                }`}
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