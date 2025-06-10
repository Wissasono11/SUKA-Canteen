import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Heart, ShoppingCart, SlidersHorizontal, Search } from "lucide-react";
import { router } from "@inertiajs/react";

export default function UserMenu({ auth, menus = [], canteens = [] }) {
    const [likedItems, setLikedItems] = useState(new Set());
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [sortBy, setSortBy] = useState("latest");
    const [search, setSearch] = useState("");
    const [selectedCanteen, setSelectedCanteen] = useState("all");
    const [showFilter, setShowFilter] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [minRating, setMinRating] = useState(0);

    // Kategori dari data menu
    const categories = useMemo(() => {
        const cats = new Set(menus.map((m) => m.category));
        return [
            { id: "all", name: "Semua" },
            ...Array.from(cats).map((cat) => ({
                id: cat,
                name: cat.charAt(0).toUpperCase() + cat.slice(1),
            })),
        ];
    }, [menus]);

    // Filter menu dan kantin berdasarkan search
    const filteredItems = useMemo(() => {
        let items = menus.filter((item) => {
            const matchCategory =
                activeCategory === "all" || item.category === activeCategory;
            const matchSearch =
                search.trim() === "" ||
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                (item.description &&
                    item.description
                        .toLowerCase()
                        .includes(search.toLowerCase())) ||
                (item.canteen &&
                    item.canteen.name
                        .toLowerCase()
                        .includes(search.toLowerCase()));
            const matchPrice =
                item.price >= priceRange[0] && item.price <= priceRange[1];
            const matchRating = (item.rating || 0) >= minRating;
            const matchCanteen =
                selectedCanteen === "all" ||
                (item.canteen && item.canteen.id == selectedCanteen);
            return (
                matchCategory &&
                matchSearch &&
                matchPrice &&
                matchRating &&
                matchCanteen
            );
        });
        // Sorting
        if (sortBy === "name_asc")
            items.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === "name_desc")
            items.sort((a, b) => b.name.localeCompare(a.name));
        else if (sortBy === "price_asc")
            items.sort((a, b) => a.price - b.price);
        else if (sortBy === "price_desc")
            items.sort((a, b) => b.price - a.price);
        else if (sortBy === "rating_desc")
            items.sort((a, b) => b.rating - a.rating);
        else if (sortBy === "rating_asc")
            items.sort((a, b) => a.rating - b.rating);
        // default: latest (by id desc)
        else items.sort((a, b) => b.id - a.id);
        return items;
    }, [
        menus,
        activeCategory,
        search,
        priceRange,
        sortBy,
        minRating,
        selectedCanteen,
    ]);

    // Filter kantin berdasarkan search
    const filteredCanteens = useMemo(() => {
        if (!search.trim()) return canteens;
        return canteens.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [canteens, search]);

    const toggleLike = (id) => {
        setLikedItems((prev) => {
            const newLiked = new Set(prev);
            if (newLiked.has(id)) {
                newLiked.delete(id);
            } else {
                newLiked.add(id);
            }
            return newLiked;
        });
    };

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const goToOrder = () => {
        router.get("/order", {
            cart: cartItems,
        });
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Menu - Suka-Canteen" />
            <div className="w-full min-h-screen bg-background-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div className="flex gap-3 w-full md:w-1/2 items-center">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Search className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari menu atau kantin..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-full border px-12 py-3 text-base focus:outline-primary bg-white shadow-sm"
                                    style={{
                                        paddingLeft: 44,
                                        height: 56,
                                    }}
                                />
                            </div>
                            <Button
                                className="bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center p-0"
                                onClick={() => setShowFilter(true)}
                                aria-label="Filter menu"
                                type="button"
                                style={{
                                    minWidth: 56,
                                    minHeight: 56,
                                    height: 56,
                                    width: 56,
                                }}
                            >
                                <SlidersHorizontal className="w-6 h-6" />
                            </Button>
                        </div>
                        {/* Modal Filter Menu */}
                        {showFilter && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                                <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-xs">
                                    <h3 className="font-bold text-lg mb-4 text-primary">
                                        Filter Menu & Kantin
                                    </h3>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">
                                            Urutkan
                                        </label>
                                        <select
                                            className="w-full border rounded px-3 py-2"
                                            value={sortBy}
                                            onChange={(e) =>
                                                setSortBy(e.target.value)
                                            }
                                        >
                                            <option value="latest">
                                                Terbaru
                                            </option>
                                            <option value="name_asc">
                                                Nama A-Z
                                            </option>
                                            <option value="name_desc">
                                                Nama Z-A
                                            </option>
                                            <option value="price_asc">
                                                Harga Termurah
                                            </option>
                                            <option value="price_desc">
                                                Harga Termahal
                                            </option>
                                            <option value="rating_desc">
                                                Rating Tertinggi
                                            </option>
                                            <option value="rating_asc">
                                                Rating Terendah
                                            </option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">
                                            Rentang Harga
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={priceRange[0]}
                                                onInput={(e) =>
                                                    (e.target.value =
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        ))
                                                }
                                                onChange={(e) =>
                                                    setPriceRange([
                                                        Number(
                                                            e.target.value || 0
                                                        ),
                                                        priceRange[1],
                                                    ])
                                                }
                                                className="w-1/2 border rounded px-2 py-1"
                                                placeholder="Min"
                                            />
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={priceRange[1]}
                                                onInput={(e) =>
                                                    (e.target.value =
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        ))
                                                }
                                                onChange={(e) =>
                                                    setPriceRange([
                                                        priceRange[0],
                                                        Number(
                                                            e.target.value || 0
                                                        ),
                                                    ])
                                                }
                                                className="w-1/2 border rounded px-2 py-1"
                                                placeholder="Max"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">
                                            Minimum Rating
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={minRating}
                                            onInput={(e) =>
                                                (e.target.value =
                                                    e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ""
                                                    ))
                                            }
                                            onChange={(e) =>
                                                setMinRating(
                                                    Number(e.target.value || 0)
                                                )
                                            }
                                            className="w-full border rounded px-2 py-1"
                                            placeholder="Contoh: 4.0"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">
                                            Pilih Kantin
                                        </label>
                                        <select
                                            className="w-full border rounded px-3 py-2"
                                            value={selectedCanteen}
                                            onChange={(e) =>
                                                setSelectedCanteen(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="all">
                                                Semua Kantin
                                            </option>
                                            {canteens.map((canteen) => (
                                                <option
                                                    key={canteen.id}
                                                    value={canteen.id}
                                                >
                                                    {canteen.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-between gap-2 mt-6">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setSortBy("latest");
                                                setPriceRange([0, 100000]);
                                                setMinRating(0);
                                                setSelectedCanteen("all");
                                            }}
                                        >
                                            Reset
                                        </Button>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setShowFilter(false)
                                                }
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-primary hover:bg-primary-hover text-white"
                                                onClick={() =>
                                                    setShowFilter(false)
                                                }
                                            >
                                                Terapkan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Kategori */}
                    <div className="flex gap-3 mb-8">
                        {["all", "madang", "sarapan", "snack", "minuman"].map(
                            (cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex items-center justify-center gap-2 px-2 py-2 rounded-full border font-semibold text-base transition-all ${
                                        activeCategory === cat
                                            ? "bg-primary text-white border-primary"
                                            : "bg-gray-100 text-black border-primary/20 hover:bg-primary/10"
                                    }`}
                                    style={{ minWidth: 120 }}
                                >
                                    <span className="w-full text-center">
                                        {cat.charAt(0).toUpperCase() +
                                            cat.slice(1)}
                                    </span>
                                </button>
                            )
                        )}
                    </div>

                    {/* Daftar Kantin */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-2 text-primary">
                            Daftar Kantin
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {filteredCanteens.length === 0 && (
                                <div className="text-gray-400">
                                    Tidak ada kantin ditemukan.
                                </div>
                            )}
                            {filteredCanteens.map((canteen) => (
                                <div
                                    key={canteen.id}
                                    className="bg-white rounded-lg shadow px-4 py-2 min-w-[180px]"
                                >
                                    <div className="font-semibold text-primary">
                                        {canteen.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {canteen.description || "-"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredItems.length === 0 && (
                            <div className="col-span-full text-center text-gray-400 py-12">
                                Tidak ada menu ditemukan.
                            </div>
                        )}
                        {filteredItems.map((item) => (
                            <Card
                                key={item.id}
                                className="overflow-hidden hover:shadow-lg transition-shadow bg-white rounded-2xl"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-36 object-cover rounded-t-2xl"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <div className="font-bold text-lg text-gray-800 mb-1">
                                        {item.name}
                                    </div>
                                    <div className="text-primary font-bold text-base mb-2">
                                        Rp {item.price.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <span>★ {item.rating || 0}</span>
                                        <span>
                                            Kantin: {item.canteen?.name || "-"}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => addToCart(item)}
                                        className="bg-primary hover:bg-primary-hover text-white rounded-full px-4 py-1 w-full mt-2"
                                        size="sm"
                                    >
                                        Tambah
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Tombol Order jika ada item di cart */}
                    {cartItems.length > 0 && (
                        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                            <Button
                                onClick={goToOrder}
                                className="bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg p-0 w-16 h-16 flex items-center justify-center text-2xl"
                                style={{ minWidth: 64, minHeight: 64 }}
                                aria-label="Lihat Keranjang"
                            >
                                <ShoppingCart className="w-8 h-8" />
                                <span className="sr-only">Lihat Keranjang</span>
                                {cartItems.length > 0 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Button>
                            <div className="mt-2 bg-white rounded shadow px-4 py-2 text-primary font-bold text-sm flex items-center">
                                Total: Rp {totalPrice.toLocaleString()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
