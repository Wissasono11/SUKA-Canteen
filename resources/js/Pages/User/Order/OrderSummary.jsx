import React from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function OrderSummary({
    voucherCode,
    setVoucherCode,
    voucherApplied,
    applyVoucher,
    discount,
    cartItems,
    totalPrice,
    formatPrice,
}) {
    return (
        <>
            <div className="flex gap-2 mt-2">
                <Input
                    placeholder="Kode Promo"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    disabled={voucherApplied}
                    className="focus:outline-none"
                />
                <Button
                    onClick={applyVoucher}
                    disabled={voucherApplied || !voucherCode}
                    className="bg-primary hover:bg-primary-hover text-white"
                >
                    Pakai
                </Button>
            </div>
            <div className="text-xs text-gray-500 mb-2">
                Contoh kode: <span className="font-mono">DISKON10</span>,{" "}
                <span className="font-mono">HEMAT5</span>,{" "}
                <span className="font-mono">GRATIS15</span>,{" "}
                <span className="font-mono">NEWUSER</span>,{" "}
                <span className="font-mono">WEEKEND</span>
            </div>
            {voucherApplied && (
                <div className="text-green-600 text-xs">
                    ✓ Voucher "{voucherCode}" berhasil diterapkan!
                </div>
            )}
            <div className="mb-2">
                <div className="font-semibold text-sm mb-1">Pesanan:</div>
                <ul className="text-xs text-gray-700 list-disc list-inside">
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name}{" "}
                            <span className="text-gray-500">
                                x{item.quantity}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between text-sm">
                <span>Total</span>
                <span>{formatPrice(totalPrice - discount)}</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between text-green-600 text-sm">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total yang dibayar</span>
                <span>{formatPrice(totalPrice - discount)}</span>
            </div>
        </>
    );
}
