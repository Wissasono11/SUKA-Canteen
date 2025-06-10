import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Button } from "@/Components/ui/button";

export default function OrderPage({ auth, cart = [], canteens = [] }) {
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCanteen, setSelectedCanteen] = useState(
        cart[0]?.canteen_id || ""
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post("/order", {
            canteen_id: selectedCanteen,
            items: cart.map((item) => ({
                menu_id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total_price: totalPrice,
            delivery_method: deliveryMethod,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Order Makanan - Suka-Canteen" />
            <div className="max-w-xl mx-auto py-12">
                <h2 className="text-2xl font-bold mb-6">Konfirmasi Pesanan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-2">
                            Kantin
                        </label>
                        <select
                            className="w-full border rounded px-4 py-2"
                            value={selectedCanteen}
                            onChange={(e) => setSelectedCanteen(e.target.value)}
                            required
                        >
                            <option value="">Pilih Kantin</option>
                            {canteens.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Daftar Pesanan
                        </label>
                        <ul className="bg-gray-50 rounded p-4">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between mb-2"
                                >
                                    <span>
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span>
                                        Rp{" "}
                                        {Number(
                                            item.price ?? 0
                                        ).toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Metode Pengambilan
                        </label>
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="delivery_method"
                                    value="pickup"
                                    checked={deliveryMethod === "pickup"}
                                    onChange={() => setDeliveryMethod("pickup")}
                                />{" "}
                                Ambil Sendiri
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="delivery_method"
                                    value="delivery"
                                    checked={deliveryMethod === "delivery"}
                                    onChange={() =>
                                        setDeliveryMethod("delivery")
                                    }
                                />{" "}
                                Jasa Pengiriman
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Rp {totalPrice.toLocaleString()}</span>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Memproses..." : "Bayar & Pesan"}
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
