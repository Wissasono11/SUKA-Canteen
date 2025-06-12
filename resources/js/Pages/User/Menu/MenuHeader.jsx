import { ShoppingCart } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function MenuHeader({ totalItems, cartItems, goToOrder }) {
    return (
        <header className="bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
                <span className="text-xl font-bold text-black">
                    Menu Hari Ini
                </span>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Button
                            variant=""
                            size="icon"
                            className="rounded-full hover:bg-gray-100 transition-colors"
                            onClick={goToOrder}
                        >
                            <ShoppingCart className="h-6 w-6 text-black" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 z-10">
                                    <span className="inline-flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-bold w-6 h-6 border-2 border-white shadow-sm">
                                        {totalItems}
                                    </span>
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
