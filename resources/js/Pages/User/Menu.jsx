import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Heart, ShoppingCart, SlidersHorizontal, Search } from "lucide-react";
import { router } from "@inertiajs/react";
import menusukaImg from "@/assets/images/menusukapage.png";
import Modal from "@/Components/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Checkbox } from "@/Components/ui/checkbox";
import HeartButton from "@/Components/ui/HeartButton";
import CategoryButton from "@/Components/ui/CategoryButton";
import CardMenu from "@/Components/ui/CardMenu";
import MenuHeader from "./Menu/MenuHeader";
import MenuHero from "./Menu/MenuHero";
import MenuSnackbar from "./Menu/MenuSnackbar";
import MenuSearchFilter from "./Menu/MenuSearchFilter";
import MenuCategoryBar from "./Menu/MenuCategoryBar";
import MenuGrid from "./Menu/MenuGrid";
import MenuRecommendation from "./Menu/MenuRecommendation";
import MenuProductModal from "./Menu/MenuProductModal";
import MenuFilterModal from "./Menu/MenuFilterModal";

export default function UserMenu({ auth, menus = [], canteens = [] }) {
    const [likedItems, setLikedItems] = useState(new Set());
    const [cartItems, setCartItems] = useState(() => {
        const local = localStorage.getItem("cartItems");
        return local ? JSON.parse(local) : [];
    });
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

    const [snackbar, setSnackbar] = useState({ show: false, message: "" });

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
            // Pastikan properti penting ada dan valid
            const safeItem = {
                id: item.id,
                name: item.name || "",
                price: typeof item.price === "number" ? item.price : 0,
                image: item.image || "",
                quantity: 1,
            };
            // Cek jika item sudah ada, update quantity saja
            const found = prev.find((i) => i.id === safeItem.id);
            if (found) {
                setSnackbar({
                    show: true,
                    message: "Jumlah menu di keranjang diperbarui!",
                    type: "success",
                });
                return prev.map((i) =>
                    i.id === safeItem.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                setSnackbar({
                    show: true,
                    message: "Menu berhasil dimasukkan ke dalam keranjang!",
                    type: "success",
                });
                return [...prev, safeItem];
            }
        });
    };

    const goToOrder = () => {
        router.get("/order");
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Snackbar auto-hide effect
    useEffect(() => {
        if (snackbar.show) {
            const timer = setTimeout(
                () => setSnackbar({ show: false, message: "" }),
                2500
            );
            return () => clearTimeout(timer);
        }
    }, [snackbar.show]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Jika cart kosong, hapus dari localStorage
    useEffect(() => {
        if (cartItems.length === 0) {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems]);

    // Refresh cartItems dari localStorage setiap kali halaman Menu mendapat fokus
    useEffect(() => {
        const handleFocus = () => {
            const local = localStorage.getItem("cartItems");
            setCartItems(local ? JSON.parse(local) : []);
        };
        window.addEventListener("focus", handleFocus);
        handleFocus();
        return () => window.removeEventListener("focus", handleFocus);
    }, []);

    // Tambahkan fungsi resetFilter agar bisa dipakai di MenuFilterModal
    const resetFilter = () => {
        setSortBy("latest");
        setMinRating(0);
        setActiveCategory("all");
        setSelectedCanteen("all");
        setPriceRange([0, 100000]);
        setSearch("");
        setShowFilter(false);
    };

    // Fungsi untuk menghapus semua item cart (dan badge keranjang)
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    useEffect(() => {
        document.title = "Menu - SUKA-Canteen";
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <MenuSnackbar snackbar={snackbar} />
            <MenuHeader
                totalItems={
                    cartItems.length > 0
                        ? cartItems.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                          )
                        : 0
                }
                cartItems={cartItems}
                goToOrder={goToOrder}
            />
            <MenuHero />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto w-full px-6 py-6 sm:py-12">
                <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-900 mb-2">
                    Isi Perut, Biar Gak Lemes!
                </h2>
                <p className="text-base sm:text-xl text-gray-700 mb-8">
                    Klik, Pesan, Kenyang.
                </p>

                {/* Search & Filter */}
                <MenuSearchFilter
                    search={search}
                    setSearch={setSearch}
                    onShowFilter={() => setShowFilter(true)}
                />

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Discover food
                </h3>
                <MenuCategoryBar
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                {/* Menu Grid */}
                <MenuGrid
                    filteredItems={filteredItems}
                    likedItems={likedItems}
                    toggleLike={toggleLike}
                    addToCart={addToCart}
                    setSelectedProduct={setSelectedProduct}
                    setProductQuantity={setProductQuantity}
                />

                <MenuRecommendation
                    menus={menus}
                    setSelectedProduct={setSelectedProduct}
                    setProductQuantity={setProductQuantity}
                />
            </main>

            {/* Product Detail Modal */}
            <MenuProductModal
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                productQuantity={productQuantity}
                setProductQuantity={setProductQuantity}
                addToCart={addToCart}
            />

            {/* Modal Filter Menu */}
            <MenuFilterModal
                show={showFilter}
                onClose={() => setShowFilter(false)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                minRating={minRating}
                setMinRating={setMinRating}
                setSortBy={setSortBy}
                setSelectedCanteen={setSelectedCanteen}
                setSearch={setSearch}
                resetFilter={resetFilter}
            />
        </div>
    );
}

UserMenu.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
