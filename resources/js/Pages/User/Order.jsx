"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Minus, Plus, Trash2, Check, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { router } from "@inertiajs/react";
import mastercard from "@/assets/svg/Mastercard.svg";
import gopay from "@/assets/svg/Gopay.svg";
import dana from "@/assets/svg/DANA.svg";
import ovo from "@/assets/svg/OVO.svg";
import qris from "@/assets/svg/QRIS.svg";
import ewalletIcon from "@/assets/svg/ewallet.svg";
import tunai from "@/assets/svg/tunai.png";
import OrderCart from "./Order/OrderCart";
import OrderCustomerForm from "./Order/OrderCustomerForm";
import OrderSummary from "./Order/OrderSummary";
import OrderPaymentMethods from "./Order/OrderPaymentMethods";

export default function OrderPage({
    cartItems: initialCartItems = [],
    updateCartItem: initialUpdateCartItem = () => {},
    totalPrice: initialTotalPrice = 0,
    onBackToMenu = () => {},
}) {
    // State untuk cart sinkronisasi
    const [cartItems, setCartItems] = useState(() => {
        // Ambil dari localStorage jika props kosong
        if (initialCartItems && initialCartItems.length > 0)
            return initialCartItems;
        const local = localStorage.getItem("cartItems");
        return local ? JSON.parse(local) : [];
    });

    const [voucherCode, setVoucherCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [discount, setDiscount] = useState(0);
    const [voucherApplied, setVoucherApplied] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        tableNumber: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [orderType, setOrderType] = useState("dinein"); // dinein/takeaway
    const [itemNotes, setItemNotes] = useState({}); // { [itemId]: note }
    const [notif, setNotif] = useState({ show: false, type: "", message: "" });
    const [ewalletDropdownOpen, setEwalletDropdownOpen] = useState(false);

    // Notifikasi otomatis hilang
    useEffect(() => {
        if (notif.show) {
            const t = setTimeout(
                () => setNotif({ show: false, type: "", message: "" }),
                2500
            );
            return () => clearTimeout(t);
        }
    }, [notif.show]);

    // Sinkronisasi cartItems ke localStorage setiap kali berubah
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const syncCart = (e) => {
            if (e.key === "cartItems") {
                setCartItems(e.newValue ? JSON.parse(e.newValue) : []);
            }
        };
        window.addEventListener("storage", syncCart);
        return () => window.removeEventListener("storage", syncCart);
    }, []);

    // Update item di cart
    const updateCartItem = (id, qty) => {
        setCartItems((prev) => {
            if (qty <= 0) return prev.filter((item) => item.id !== id);
            return prev.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
            );
        });
    };

    // Hitung total harga
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const applyVoucher = () => {
        // Simulasi voucher codes
        const vouchers = {
            DISKON10: 0.1,
            HEMAT5: 0.05,
            GRATIS15: 15000,
            NEWUSER: 0.15,
            WEEKEND: 5000,
        };

        if (vouchers[voucherCode.toUpperCase()]) {
            const voucherValue = vouchers[voucherCode.toUpperCase()];

            if (voucherValue < 1) {
                // Percentage discount
                setDiscount(totalPrice * voucherValue);
            } else {
                // Fixed amount discount
                setDiscount(Math.min(voucherValue, totalPrice));
            }

            setVoucherApplied(true);
        } else {
            alert("Kode voucher tidak valid!");
        }
    };

    const finalTotal = Math.max(0, totalPrice - discount);

    const handleOrder = async () => {
        if (cartItems.length === 0) {
            setNotif({
                show: true,
                type: "error",
                message: "Keranjang masih kosong!",
            });
            return;
        }

        if (!customerInfo.name || !customerInfo.phone) {
            setNotif({
                show: true,
                type: "error",
                message: "Mohon lengkapi nama dan nomor telepon!",
            });
            return;
        }

        if (customerInfo.phone.length < 10) {
            setNotif({
                show: true,
                type: "error",
                message: "Nomor telepon tidak valid!",
            });
            return;
        }

        if (!orderType) {
            setNotif({
                show: true,
                type: "error",
                message: "Pilih tipe pesanan!",
            });
            return;
        }

        if (!paymentMethod) {
            setNotif({
                show: true,
                type: "error",
                message: "Pilih metode pembayaran!",
            });
            return;
        }

        setIsLoading(true);

        try {
            await router.post(
                "/orders", // pastikan route ini sesuai web.php
                {
                    items: cartItems.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        note: itemNotes[item.id] || "",
                    })),
                    customer_name: customerInfo.name,
                    customer_phone: customerInfo.phone,
                    order_type: orderType,
                    note: customerInfo.note || "",
                    payment_method: paymentMethod,
                    voucher: voucherApplied ? voucherCode : null,
                    discount: discount,
                    total: finalTotal,
                },
                {
                    onSuccess: () => {
                        setOrderSuccess(true);
                        setNotif({
                            show: true,
                            type: "success",
                            message: "Pesanan berhasil dibuat!",
                        });
                        clearCart();
                    },
                    onError: (errors) => {
                        setNotif({
                            show: true,
                            type: "error",
                            message: errors?.message || "Terjadi kesalahan saat memproses pesanan!",
                        });
                    },
                    preserveScroll: true,
                }
            );
        } catch (error) {
            setNotif({
                show: true,
                type: "error",
                message: "Terjadi kesalahan saat memproses pesanan!",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Saat mengosongkan cart, hapus juga dari localStorage
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    useEffect(() => {
        document.title = "Order - SUKA-Canteen";
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center mb-6">
                    <Button
                        onClick={() => router.get("/menu")}
                        variant="ghost"
                        className="mr-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold">Keranjang Pesanan</h1>
                </div>
                <Card className="text-center py-12">
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <span className="text-6xl mb-2">🛒</span>
                            <p className="text-gray-500 text-lg mb-4">
                                Keranjang Anda masih kosong
                            </p>
                        </div>
                        <Button
                            onClick={() => router.get("/menu")}
                            className="bg-primary hover:bg-primary-hover text-white"
                        >
                            Mulai Belanja
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-2 py-4 max-w-6xl">
            {/* Header Order Details */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* LEFT: Order Details */}
                <div className="flex-1 bg-white rounded-2xl shadow p-3 md:p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.get("/menu")}
                                className="mr-2 rounded-full hover:bg-gray-100 border-transparent border-gray-200 w-10 h-10 flex items-center justify-center"
                                aria-label="Kembali ke Menu"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight flex items-center gap-2">
                                Detail Pesanan
                                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                    Items ({cartItems.length})
                                </span>
                            </h2>
                        </div>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={clearCart}
                            className="border-gray-200 border-transparent hover:bg-red-300 text-red-600"
                        >
                            Clear All
                        </Button>
                    </div>
                    <OrderCart
                        cartItems={cartItems}
                        updateCartItem={updateCartItem}
                        formatPrice={formatPrice}
                    />
                </div>

                {/* Invoice & Payment */}
                <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
                    <Card className="mb-4">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">
                                Rincian Pesanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <OrderCustomerForm
                                customerInfo={customerInfo}
                                setCustomerInfo={setCustomerInfo}
                                orderType={orderType}
                                setOrderType={setOrderType}
                            />
                        </CardContent>
                    </Card>
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Ringkasan Pembayaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <OrderSummary
                                voucherCode={voucherCode}
                                setVoucherCode={setVoucherCode}
                                voucherApplied={voucherApplied}
                                applyVoucher={applyVoucher}
                                discount={discount}
                                cartItems={cartItems}
                                totalPrice={totalPrice}
                                formatPrice={formatPrice}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                Metode Pembayaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OrderPaymentMethods
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                ewalletDropdownOpen={ewalletDropdownOpen}
                                setEwalletDropdownOpen={setEwalletDropdownOpen}
                            />
                            <Button
                                className="w-full bg-primary hover:bg-primary-hover text-white mb-2"
                                size="lg"
                                onClick={handleOrder}
                                disabled={
                                    isLoading ||
                                    cartItems.length === 0 ||
                                    !customerInfo.name ||
                                    !customerInfo.phone ||
                                    !orderType ||
                                    !paymentMethod
                                }
                                aria-label="Make Payment"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Memproses Pesanan...
                                    </>
                                ) : (
                                    "Buat Pesanan"
                                )}
                            </Button>
                            <Button
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 mb-2"
                                size="lg"
                                variant="outline"
                                onClick={() => {
                                    router.get("/menu");
                                    // Pastikan cart kosong di localStorage
                                    if (cartItems.length === 0) {
                                        localStorage.removeItem("cartItems");
                                    }
                                }}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali ke Menu
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Notifikasi */}
            {notif.show && (
                <div
                    className={`fixed bottom-4 right-4 z-50 max-w-sm w-full rounded-lg shadow-lg p-4 text-sm ${
                        notif.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {notif.message}
                </div>
            )}
        </div>
    );
}
