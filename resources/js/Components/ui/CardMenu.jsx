import React from "react";
import HeartButton from "@/Components/ui/HeartButton";

/**
 * Reusable CardMenu component for displaying menu items (food/drink).
 * @param {object} item - Menu item data.
 * @param {boolean} liked - Whether the item is liked.
 * @param {function} onLike - Handler for like button.
 * @param {function} onAdd - Handler for add button (optional).
 * @param {function} onClick - Handler for card click (optional).
 * @param {string} className - Additional classes for the card.
 * @param {React.ReactNode} children - Extra content (optional).
 * @param {number} heartSize - Size of the heart button (default 24).
 * @param {boolean} showCategoryBadge - Show category badge (default true).
 */
export default function CardMenu({
    item,
    liked,
    onLike,
    onAdd,
    onClick,
    className = "",
    children,
    heartSize = 24,
    showCategoryBadge = true,
}) {
    return (
        <div
            className={`relative bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className="relative">
                <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover bg-gray-100"
                />
                <HeartButton
                    liked={liked}
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike && onLike(item.id);
                    }}
                    className="absolute top-2 right-2"
                    size={heartSize}
                />
                {showCategoryBadge && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:bg-green-700">
                        {item.categoryLabel || (typeof item.category === "object" ? item.category?.name : item.category) || "-"}
                    </span>
                )}
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="font-bold text-lg truncate">{item.name}</div>
                <div className="text-gray-500 text-sm truncate">
                    {item.description}
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-green-600 text-sm">
                        Rp{" "}
                        <span className="font-bold text-black text-xl">
                            {item.price?.toLocaleString() || "-"}
                        </span>
                    </span>
                    {onAdd && (
                        <button
                            className="ml-2 px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold hover:bg-primary-hover transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAdd(item.id);
                            }}
                        >
                            Add
                        </button>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}
