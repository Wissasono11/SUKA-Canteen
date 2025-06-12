import React, { useState } from "react";
import Modal from "@/Components/ui/Modal";

export default function CanteenProfileModal({ open, onClose, user, canteen }) {
    const [tab, setTab] = useState("account");
    return (
        <Modal open={open} onClose={onClose}>
            <div className="mb-4 flex border-b">
                <button className={`px-4 py-2 ${tab === "account" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"}`} onClick={() => setTab("account")}>Akun</button>
                <button className={`px-4 py-2 ${tab === "canteen" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"}`} onClick={() => setTab("canteen")}>Kantin</button>
                <button className={`px-4 py-2 ${tab === "payment" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"}`} onClick={() => setTab("payment")}>Pembayaran</button>
            </div>
            {tab === "account" && (
                <div>
                    <h3 className="font-semibold mb-2">Edit Akun</h3>
                    {/* Form edit username, email, password */}
                    <input className="border p-2 w-full mb-2" defaultValue={user?.name} placeholder="Nama Pengguna" />
                    <input className="border p-2 w-full mb-2" defaultValue={user?.email} placeholder="Email" />
                    <input className="border p-2 w-full mb-2" type="password" placeholder="Password Baru" />
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Simpan Perubahan</button>
                </div>
            )}
            {tab === "canteen" && (
                <div>
                    <h3 className="font-semibold mb-2">Edit Kantin</h3>
                    {/* Form edit nama, jam buka/tutup kantin */}
                    <input className="border p-2 w-full mb-2" defaultValue={canteen?.name} placeholder="Nama Kantin" />
                    <input className="border p-2 w-full mb-2" defaultValue={canteen?.opening_time} placeholder="Jam Buka (ex: 08:00)" />
                    <input className="border p-2 w-full mb-2" defaultValue={canteen?.closing_time} placeholder="Jam Tutup (ex: 16:00)" />
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Simpan Perubahan</button>
                </div>
            )}
            {tab === "payment" && (
                <div>
                    <h3 className="font-semibold mb-2">Pengaturan Pembayaran</h3>
                    {/* Form pengelolaan sistem pembayaran */}
                    <input className="border p-2 w-full mb-2" placeholder="Metode Pembayaran (ex: Transfer, QRIS)" />
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Simpan Pembayaran</button>
                </div>
            )}
        </Modal>
    );
}
