import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const STATUS_LIST = ["Menunggu", "Proses", "Selesai"];

export default function DashboardOrders({ onOrderCompleted }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState({}); // {orderId: statusIndex}
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("/api/orders", { headers: { Accept: "application/json" }, credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                    // Inisialisasi status dari backend jika ada
                    const statusObj = {};
                    data.forEach(order => {
                        // Mapping status backend ke index STATUS_LIST
                        let idx = STATUS_LIST.indexOf(order.status);
                        statusObj[order.id] = idx >= 0 ? idx : 0;
                    });
                    setOrderStatus(statusObj);
                } else {
                    setOrders([]);
                    console.error("API /api/orders response:", data);
                }
            })
            .catch((err) => {
                setOrders([]);
                console.error("API /api/orders error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    // Fungsi untuk mengubah status pesanan dan update ke backend
    const handleStatusChange = async (orderId, newStatus) => {
        setOrderStatus(prev => ({ ...prev, [orderId]: STATUS_LIST.indexOf(newStatus) }));
        // Kirim perubahan status ke backend
        try {
            await fetch(`/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            });
        } catch (err) {
            // Optional: tampilkan error jika gagal update
            console.error("Gagal update status pesanan", err);
        }
    };

    // Fungsi untuk handle pembayaran diterima
    const handlePaymentAccepted = async (orderId) => {
        // Hapus pesanan dari daftar (optimistic update)
        setOrders(prev => prev.filter(order => order.id !== orderId));
        // Update status di backend: payment_status = 'paid' dan status = 'Selesai'
        try {
            await fetch(`/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ payment_status: 'paid', status: 'selesai' })
            });
            if (onOrderCompleted) onOrderCompleted(); // Trigger refresh report
        } catch (err) {
            console.error("Gagal update pembayaran pesanan", err);
        }
        setShowConfirm(false);
        setSelectedOrderId(null);
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Pesanan Terbaru</h3>
            {loading ? <div>Loading...</div> : (
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-gray-500">Belum ada pesanan.</div>
                    ) : (
                        orders.map(order => {
                            const statusValue = STATUS_LIST[orderStatus[order.id]];
                            return (
                                <Card key={order.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <div className="font-medium">Order #{order.order_number}</div>
                                                <div className="text-sm text-gray-500">Oleh: {order.customer?.name || '-'}</div>
                                                <div className="text-sm text-gray-500">{order.items ? order.items.length : 0} item • Rp{order.total_amount}</div>
                                            </div>
                                            <div className="flex space-x-2 items-center">
                                                <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                                                    {order.payment_method === 'cash' ? 'Tunai' :
                                                    order.payment_method === 'e_wallet' ? 'E-Wallet' :
                                                    order.payment_method === 'qris' ? 'QRIS' :
                                                    order.payment_method === 'debit' ? 'Kartu Debit' :
                                                    order.payment_method}
                                                </span>
                                                <select
                                                    className={
                                                        `ml-2 px-4 py-1 rounded border text-xs font-semibold ` +
                                                        (statusValue === 'Menunggu'
                                                            ? 'bg-red-100 text-red-700 border-red-300'
                                                            : statusValue === 'Proses'
                                                                ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                                                : 'bg-green-100 text-green-700 border-green-300')
                                                    }
                                                    value={statusValue}
                                                    onChange={e => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    {STATUS_LIST.map((status, idx) => (
                                                        <option
                                                            key={status}
                                                            value={status}
                                                            className={
                                                                status === 'Menunggu'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : status === 'Proses'
                                                                        ? 'bg-yellow-100 text-yellow-700'
                                                                        : 'bg-green-100 text-green-700'
                                                            }
                                                        >
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button
                                                    className="ml-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs"
                                                    size="sm"
                                                    disabled={statusValue !== 'Selesai'}
                                                    onClick={() => {
                                                        setShowConfirm(true);
                                                        setSelectedOrderId(order.id);
                                                    }}
                                                >
                                                    Pembayaran Diterima
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="font-semibold text-sm mb-1">Menu Dipesan:</div>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {(order.items || []).map(item => (
                                                    <li key={item.id}>
                                                        {item.menu_item?.name ? `${item.menu_item.name}` : '-'} x{item.quantity} @ Rp{item.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            )}
            {/* Pop up konfirmasi pembayaran */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                        <div className="mb-4 text-lg font-semibold">Apakah yakin pemesanan sudah selesai?</div>
                        <div className="flex justify-center space-x-4">
                            <Button variant="outline" onClick={() => { setShowConfirm(false); setSelectedOrderId(null); }}>Batal</Button>
                            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handlePaymentAccepted(selectedOrderId)}>Yakin</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
