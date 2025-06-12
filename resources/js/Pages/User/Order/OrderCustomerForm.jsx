import React from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

export default function OrderCustomerForm({
    customerInfo,
    setCustomerInfo,
    orderType,
    setOrderType,
}) {
    return (
        <>
            <div>
                <Label htmlFor="buyerName">Nama Pembeli</Label>
                <Input
                    id="buyerName"
                    placeholder="Masukkan nama Anda"
                    value={customerInfo.name}
                    onChange={(e) =>
                        setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                        })
                    }
                    required
                    className="focus:outline-none"
                />
            </div>
            <div>
                <Label className="block mb-1">Tipe Pesanan</Label>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 rounded font-medium border transition-colors duration-150 ${
                            orderType === "dinein"
                                ? "bg-primary text-white border-primary-hover"
                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => setOrderType("dinein")}
                        aria-pressed={orderType === "dinein"}
                    >
                        {/* SVG icon Dine In */}
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M3 21h18" />
                            <path d="M4 10V7a4 4 0 0 1 8 0v3" />
                            <rect x="2" y="10" width="20" height="7" rx="2" />
                        </svg>
                        Dine In
                    </Button>
                    <Button
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 rounded font-medium border transition-colors duration-150 ${
                            orderType === "takeaway"
                                ? "bg-primary text-white border-primary-hover"
                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => setOrderType("takeaway")}
                        aria-pressed={orderType === "takeaway"}
                    >
                        {/* SVG icon Takeaway */}
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M3 7h18l-1.5 12.5a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L3 7z" />
                            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                        </svg>
                        Takeaway
                    </Button>
                </div>
            </div>
            <div>
                <Label htmlFor="orderNote">Catatan</Label>
                <textarea
                    id="orderNote"
                    className="w-full border rounded px-3 py-2 text-sm mt-1 focus:outline-none"
                    placeholder="Catatan untuk dapur, misal: tanpa sambal, dsb."
                    value={customerInfo.note || ""}
                    onChange={(e) =>
                        setCustomerInfo({
                            ...customerInfo,
                            note: e.target.value,
                        })
                    }
                    rows={2}
                />
            </div>
        </>
    );
}
