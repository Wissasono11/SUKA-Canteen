import React from "react";
import { Button } from "@/Components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function OrderCart({ cartItems, updateCartItem, formatPrice }) {
    return (
        <div>
            {/* Table Head */}
            <div className="hidden md:grid grid-cols-12 gap-2 px-2 py-2 border-b font-semibold text-gray-700 text-sm">
                <div className="col-span-5">Menu</div>
                <div className="col-span-2 text-right">Harga</div>
                <div className="col-span-2 text-center">Jumlah</div>
                <div className="col-span-2 text-right">Total</div>
            </div>
            {/* Cart Items Table */}
            <div className="divide-y md:divide-none">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:grid md:grid-cols-12 gap-2 px-0 md:px-2 py-3 items-center border-b last:border-b-0"
                    >
                        <div className="flex items-center gap-3 md:col-span-5 w-full md:w-auto">
                            <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                                <div className="font-semibold text-base line-clamp-1 md:line-clamp-none">
                                    {item.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between md:block w-full md:col-span-2 text-right font-medium">
                            <span className="text-green-600 text-xs font-bold md:text-sm">
                                Rp
                            </span>
                            <span className="text-black text-base font-bold md:text-md ml-1">
                                {formatPrice(item.price)
                                    .replace("Rp", "")
                                    .trim()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between md:justify-center gap-2 w-full md:col-span-2 mt-2 md:mt-0">
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                    updateCartItem(item.id, item.quantity - 1)
                                }
                                className="w-7 h-7 border-gray-300 text-gray-600 hover:bg-gray-100"
                                aria-label="Kurangi jumlah"
                            >
                                <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 text-center font-medium">
                                {item.quantity}
                            </span>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                    updateCartItem(item.id, item.quantity + 1)
                                }
                                className="w-7 h-7 border-gray-300 text-gray-600 hover:bg-gray-100"
                                aria-label="Tambah jumlah"
                            >
                                <Plus className="w-3 h-3" />
                            </Button>
                        </div>
                        <div className="flex justify-between md:block w-full md:col-span-2 text-right font-semibold mt-2 md:mt-0">
                            <span className="text-green-600 text-xs font-bold md:text-sm">
                                Rp
                            </span>
                            <span className="text-black text-base font-bold md:text-md ml-1">
                                {formatPrice(item.price * item.quantity)
                                    .replace("Rp", "")
                                    .trim()}
                            </span>
                        </div>
                        <div className="flex justify-end md:justify-center w-full md:col-span-1 mt-2 md:mt-0">
                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => updateCartItem(item.id, 0)}
                                aria-label="Hapus item"
                                className="w-8 h-8 border-red-500 text-white bg-red-500 flex items-center justify-center rounded-md hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
