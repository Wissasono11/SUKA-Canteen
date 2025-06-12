import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";

export default function DashboardOrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/api/orders/history", { headers: { Accept: "application/json" }, credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                    console.error("API /api/orders/history response:", data);
                }
            })
            .catch((err) => {
                setOrders([]);
                console.error("API /api/orders/history error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Riwayat Pesanan</h3>
            {loading ? <div>Loading...</div> : (
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-gray-500">Belum ada riwayat pesanan.</div>
                    ) : (
                        orders.map(order => (
                            <Card key={order.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <div className="font-medium">Order #{order.order_number}</div>
                                            <div className="text-sm text-gray-500">Oleh: {order.customer?.name || '-'}</div>
                                            <div className="text-sm text-gray-500">{order.items ? order.items.length : 0} item • Rp{order.total_amount}</div>
                                            <div className="text-xs mt-1">Status: <span className="font-semibold">{order.status}</span></div>
                                        </div>
                                        <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                                            {order.payment_method === 'cash' ? 'Tunai' :
                                            order.payment_method === 'e_wallet' ? 'E-Wallet' :
                                            order.payment_method === 'qris' ? 'QRIS' :
                                            order.payment_method === 'debit' ? 'Kartu Debit' :
                                            order.payment_method}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <div className="font-semibold text-sm mb-1">Menu Dipesan:</div>
                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                            {(order.items || []).map(item => (
                                                <li key={item.id}>{item.menu_item?.name || '-'} x{item.quantity} @ Rp{item.price}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
