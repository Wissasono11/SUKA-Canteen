import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";

export default function OrderStatusPopup({ orderId, onClose }) {
    const [order, setOrder] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [finalConfirm, setFinalConfirm] = useState(false);

    useEffect(() => {
        if (!orderId) return;
        setLoading(true);
        fetch(`/api/orders/${orderId}`)
            .then(res => res.json())
            .then(data => setOrder(data))
            .finally(() => setLoading(false));
        // Polling status setiap 3 detik
        const interval = setInterval(() => {
            fetch(`/api/orders/${orderId}`)
                .then(res => res.json())
                .then(data => setOrder(data));
        }, 3000);
        return () => clearInterval(interval);
    }, [orderId]);

    if (!orderId || !order) return null;
    if (finalConfirm) return null;

    // Jika status sudah selesai dan pembayaran sudah diterima, tampilkan konfirmasi menu
    if (order.status === "Selesai" && order.payment_status === "paid") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                    <div className="text-2xl mb-2">✅ Pesanan Selesai</div>
                    <div className="mb-4">Apakah menu sudah sesuai?</div>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={onClose}>Tutup</Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { setFinalConfirm(true); onClose(); }}>Ya, Sudah</Button>
                    </div>
                </div>
            </div>
        );
    }

    // Popup status berjalan
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                <div className="text-xl font-bold mb-2">Status Pesanan</div>
                <div className="mb-2">Nomor Order: <span className="font-mono">{order.order_number}</span></div>
                <div className="mb-4">
                    Status: <span className="font-semibold">{order.status}</span>
                </div>
                <div className="mb-2">Silakan tunggu, status pesanan Anda akan diperbarui otomatis.</div>
                <Button className="mt-2" onClick={onClose}>Tutup</Button>
            </div>
        </div>
    );
}
