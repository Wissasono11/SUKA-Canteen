import Modal from "@/Components/Modal";
import { Checkbox } from "@/Components/ui/checkbox";

export default function MenuFilterModal({
    show,
    onClose,
    priceRange,
    setPriceRange,
    activeCategory,
    setActiveCategory,
    minRating,
    setMinRating,
    setSortBy,
    setSelectedCanteen,
    setSearch,
    resetFilter,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
                <button
                    className="absolute top-5 right-5 text-2xl text-gray-700 hover:text-black"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-6">Filter Menu</h2>
                {/* Price Range */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Price Range
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Min"
                            className="border rounded-lg px-4 py-3 w-1/2"
                            value={priceRange[0]}
                            onInput={(e) =>
                                (e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                ))
                            }
                            onChange={(e) =>
                                setPriceRange([
                                    Number(e.target.value || 0),
                                    priceRange[1],
                                ])
                            }
                        />
                        <span className="self-center">to</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Max"
                            className="border rounded-lg px-4 py-3 w-1/2"
                            value={priceRange[1]}
                            onInput={(e) =>
                                (e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                ))
                            }
                            onChange={(e) =>
                                setPriceRange([
                                    priceRange[0],
                                    Number(e.target.value || 0),
                                ])
                            }
                        />
                    </div>
                </div>
                {/* Categories */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Categories
                    </label>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <Checkbox
                                checked={activeCategory === "all"}
                                onCheckedChange={() => setActiveCategory("all")}
                            />
                            Semua
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <Checkbox
                                checked={activeCategory === "madang"}
                                onCheckedChange={() =>
                                    setActiveCategory("madang")
                                }
                            />
                            Madang
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <Checkbox
                                checked={activeCategory === "sarapan"}
                                onCheckedChange={() =>
                                    setActiveCategory("sarapan")
                                }
                            />
                            Sarapan
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <Checkbox
                                checked={activeCategory === "snack"}
                                onCheckedChange={() =>
                                    setActiveCategory("snack")
                                }
                            />
                            Snack
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <Checkbox
                                checked={activeCategory === "minuman"}
                                onCheckedChange={() =>
                                    setActiveCategory("minuman")
                                }
                            />
                            Minuman
                        </label>
                    </div>
                </div>
                {/* Rating */}
                <div className="mb-8">
                    <label className="block font-semibold mb-2">Rating</label>
                    <div className="flex flex-col gap-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <label
                                key={star}
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >
                                <Checkbox
                                    checked={minRating === star}
                                    onCheckedChange={() => setMinRating(star)}
                                />
                                <span className="flex items-center gap-1">
                                    {Array(star)
                                        .fill(0)
                                        .map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                                viewBox="0 0 20 20"
                                            >
                                                <polygon points="10,1 12.59,6.99 19,7.64 14,12.26 15.18,18.51 10,15.27 4.82,18.51 6,12.26 1,7.64 7.41,6.99" />
                                            </svg>
                                        ))}
                                    <span className="ml-1">& Up</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        className="flex-1 border-2 border-text text-text rounded-lg py-3 font-semibold hover:bg-background-secondary"
                        onClick={resetFilter}
                    >
                        Reset
                    </button>
                    <button
                        className="flex-1 bg-primary text-white rounded-lg py-3 font-semibold hover:bg-primary-hover"
                        onClick={onClose}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </Modal>
    );
}
