import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Heart, ShoppingCart, SlidersHorizontal, Search } from "lucide-react";
import { router } from "@inertiajs/react";
import menusukaImg from "@/assets/images/menusukapage.png";
import Modal from "@/Components/Modal";

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

    // State tambahan untuk detail produk
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);

    // Kategori statis
    const categories = [
        { id: "all", name: "Semua" },
        { id: "madang", name: "Madang" },
        { id: "sarapan", name: "Sarapan" },
        { id: "snack", name: "Snack" },
        { id: "minuman", name: "Minuman" },
    ];

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
        <div className="min-h-screen bg-white">
            <Head title="Menu - SUKA-Canteen" />
            {/* Header */}
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <span className="text-xl font-bold text-black">
                        Menu Hari Ini
                    </span>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => {
                                    if (cartItems.length > 0) {
                                        router.get("/order", {
                                            cart: cartItems,
                                        });
                                    }
                                }}
                            >
                                <ShoppingCart className="h-6 w-6 text-black" />
                            </Button>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center border-2 border-white z-10">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20">
                <div className="max-w-full mx-auto w-full px-6">
                    <div className="w-full h-72 rounded-2xl overflow-hidden bg-white flex items-center justify-center relative">
                        <img
                            src={menusukaImg}
                            alt="Ice Cream Banner"
                            className="absolute inset-0 w-full h-80 object-cover"
                        />
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/30">
                            <h1
                                className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
                                style={{
                                    textShadow:
                                        "0 4px 24px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)",
                                }}
                            >
                                Welcome to SUKA-Canteen
                            </h1>
                            <p
                                className="text-base sm:text-lg text-white/90 drop-shadow-md"
                                style={{
                                    textShadow:
                                        "0 2px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)",
                                }}
                            >
                                Temukan cita rasa terbaik dari hidangan kantin
                                pilihan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tambahkan margin bawah banner */}
            <div className="h-auto" />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto w-full px-6 py-12">
                <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-900 mb-2">
                    Isi Perut, Biar Gak Lemes!
                </h2>
                <p className="text-base sm:text-xl text-gray-700 mb-8">
                    Klik, Pesan, Kenyang.
                </p>

                {/* Search & Filter */}
                <div className="flex items-center gap-4 mb-8 max-w-2xl">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari Menu dan Kantin Favoritmu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full border px-12 py-4 text-base focus:outline-primary bg-white shadow-sm text-ellipsis placeholder:text-ellipsis placeholder:whitespace-nowrap placeholder:text-gray-400 placeholder:text-base sm:placeholder:text-base placeholder:text-sm"
                            style={{ paddingLeft: 44 }}
                        />
                    </div>
                    <Button
                        className="bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center p-0"
                        style={{
                            minWidth: 48,
                            minHeight: 48,
                            height: 48,
                            width: 48,
                        }}
                        type="button"
                        onClick={() => setShowFilter(true)}
                    >
                        <SlidersHorizontal className="w-6 h-6" />
                    </Button>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Discover food
                </h3>
                <div className="mb-8 overflow-x-auto sm:overflow-visible">
                    <div
                        className="flex sm:flex-wrap gap-3 whitespace-nowrap sm:whitespace-normal"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant="outline"
                                className={`inline-block sm:block rounded-full px-6 py-2 text-gray-900 border-gray-300 transition-all duration-150 ${
                                    activeCategory === cat.id
                                        ? "bg-primary text-white border-primary"
                                        : ""
                                }`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="bg-white shadow rounded-2xl border border-gray-100 relative cursor-pointer"
                            onClick={() => {
                                setSelectedProduct(item);
                                setProductQuantity(1);
                            }}
                        >
                            <CardContent className="p-6">
                                <div className="relative mb-4">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-48 object-cover rounded-xl bg-gray-100"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(item.id);
                                        }}
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${
                                                likedItems.has(item.id)
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                    </Button>
                                </div>
                                <h4 className="font-bold text-lg mb-1 text-gray-900">
                                    {item.name}
                                </h4>
                                <p className="text-gray-600 text-sm mb-2">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-bold text-primary text-lg">
                                        Rp {item.price.toLocaleString()}
                                    </span>
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary-hover text-white rounded-full px-6"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(item);
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* We Recommend Section */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6">We Recommend</h3>
                    <div className="flex flex-wrap gap-6">
                        {menus
                            .filter((item) => item.rating >= 4.5) // Atau logika rekomendasi lain
                            .slice(0, 3)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow border p-6 flex flex-col w-full max-w-xs min-w-[220px] sm:flex-row sm:items-center sm:max-w-md sm:min-w-[320px] cursor-pointer hover:shadow-lg transition"
                                    onClick={() => {
                                        setSelectedProduct(item);
                                        setProductQuantity(1);
                                    }}
                                >
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mr-0 sm:mr-6 mb-4 sm:mb-0">
                                        <img
                                            src={
                                                item.image || "/placeholder.svg"
                                            }
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-lg mb-1">
                                            {item.name}
                                        </div>
                                        <div className="text-gray-500 text-sm mb-2">
                                            Starting From
                                        </div>
                                        <div className="font-bold text-xl text-black mb-2">
                                            Rp {item.price.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-500 text-lg">
                                                ★
                                            </span>
                                            <span className="font-medium text-gray-700">
                                                {item.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </main>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl relative flex flex-col md:flex-row gap-8">
                        <button
                            className="absolute top-5 right-5 text-2xl text-gray-700 hover:text-black"
                            onClick={() => setSelectedProduct(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <button
                            className="absolute top-5 left-5 flex items-center gap-2 text-lg font-medium text-black hover:underline"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <span className="text-xl">←</span> Back
                        </button>
                        <div className="flex-1 flex items-center justify-center">
                            <img
                                src={
                                    selectedProduct.image || "/placeholder.svg"
                                }
                                alt={selectedProduct.name}
                                className="w-80 h-80 object-cover rounded-full bg-gray-100"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h2 className="text-4xl font-extrabold mb-2 flex items-center gap-2">
                                {selectedProduct.name}{" "}
                                {selectedProduct.isHot && <span>🔥</span>}
                            </h2>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <polygon points="10,1 12.59,6.99 19,7.64 14,12.26 15.18,18.51 10,15.27 4.82,18.51 6,12.26 1,7.64 7.41,6.99" />
                                    </svg>
                                </span>
                                <span className="font-semibold">
                                    {selectedProduct.rating}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-6">
                                {selectedProduct.description}
                            </p>
                            <div className="flex items-center gap-4 mb-8">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() =>
                                        setProductQuantity((q) =>
                                            Math.max(1, q - 1)
                                        )
                                    }
                                >
                                    -
                                </Button>
                                <span className="text-xl font-semibold bg-black text-white px-6 py-2 rounded-full min-w-[3rem] text-center">
                                    {productQuantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() =>
                                        setProductQuantity((q) => q + 1)
                                    }
                                >
                                    +
                                </Button>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-600">
                                    Total Price
                                </span>
                                <span className="text-2xl font-bold">
                                    Rp{" "}
                                    {(
                                        selectedProduct.price * productQuantity
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <Button
                                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
                                onClick={() => {
                                    addToCart({
                                        ...selectedProduct,
                                        quantity: productQuantity,
                                    });
                                    setSelectedProduct(null);
                                }}
                            >
                                Add to Cart{" "}
                                <span className="bg-white text-black rounded-full p-1">
                                    +
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Filter Menu */}
            <Modal
                show={showFilter}
                onClose={() => setShowFilter(false)}
                maxWidth="lg"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
                    <button
                        className="absolute top-5 right-5 text-2xl text-gray-700 hover:text-black"
                        onClick={() => setShowFilter(false)}
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
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={activeCategory === "all"}
                                    onChange={() => setActiveCategory("all")}
                                />{" "}
                                Semua
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={activeCategory === "madang"}
                                    onChange={() => setActiveCategory("madang")}
                                />{" "}
                                Madang
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={activeCategory === "sarapan"}
                                    onChange={() =>
                                        setActiveCategory("sarapan")
                                    }
                                />{" "}
                                Sarapan
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={activeCategory === "snack"}
                                    onChange={() => setActiveCategory("snack")}
                                />{" "}
                                Snack
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={activeCategory === "minuman"}
                                    onChange={() =>
                                        setActiveCategory("minuman")
                                    }
                                />{" "}
                                Minuman
                            </label>
                        </div>
                    </div>
                    {/* Kantin */}
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">
                            Kantin
                        </label>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" /> Kantin Selatan
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" /> Kantin Utara
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" /> Kantin Timur
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" /> Kantin Barat
                            </label>
                        </div>
                    </div>
                    {/* Rating */}
                    <div className="mb-8">
                        <label className="block font-semibold mb-2">
                            Rating
                        </label>
                        <div className="flex flex-col gap-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <label
                                    key={star}
                                    className="flex items-center gap-2"
                                >
                                    <input type="checkbox" />
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
                            className="flex-1 border-2 border-primary text-primary rounded-lg py-3 font-semibold hover:bg-[#f7f8f9]"
                            onClick={() => {
                                setSortBy("latest");
                                setMinRating(0);
                                setActiveCategory("all");
                                setSelectedCanteen("all");
                                setPriceRange([0, 100000]);
                                setSearch("");
                                setShowFilter(false);
                            }}
                        >
                            Reset
                        </button>
                        <button
                            className="flex-1 bg-primary text-white rounded-lg py-3 font-semibold hover:bg-primary-hover"
                            onClick={() => setShowFilter(false)}
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

UserMenu.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
