"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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
            fetchUsers();
        } catch (err) {
            console.error("خطا در تغییر نقش:", err);
        }
    };
    

    const deleteUser = async (id) => {
        if (!confirm("آیا از حذف کاربر مطمئن هستید؟")) return;
        try {
            const token = localStorage.getItem("token");
            await fetch(`https://researchback.onrender.com/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (err) {
            console.error("خطا در حذف کاربر:", err);
        }
    };
    

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4 max-w-6xl mx-auto" dir="rtl">
            <h1 className="text-2xl font-bold mb-4 text-[#00a693]">مدیریت کاربران</h1>

            {loading ? (
                <p>در حال بارگذاری...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-right bg-white shadow-md rounded-md overflow-hidden text-sm md:text-base">
                        <thead className="bg-[#e0f7f4] text-[#00786b]">
                            <tr>
                                <th className="p-3">عملیات</th>
                                <th className="p-3">نقش</th>
                                <th className="p-3">شماره</th>
                                <th className="p-3">نام</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-[#f8fdfc] transition"
                                >
                                    <td className="p-3 space-x-2 space-x-reverse">
                                        <button
                                            onClick={() =>
                                                updateRole(user._id, user.role === "admin" ? "user" : "admin")
                                            }
                                            className="text-white bg-[#00a693] px-3 py-1 rounded hover:bg-[#00917d] text-sm"
                                        >
                                            تغییر نقش
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3">{user.phone}</td>
                                    <td className="p-3">{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
