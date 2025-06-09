import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

// import assets
import ayamImg from "@/assets/images/ayam.png";
import sotoImg from "@/assets/images/soto.png";
import nasigorengImg from "@/assets/images/nasigoreng.png";
import nasiayamImg from "@/assets/images/nasiayam.png";
import rotibakarImg from "@/assets/images/rotibakar.png";
import pisanggorengImg from "@/assets/images/pisanggoreng.png";
import baksoImg from "@/assets/images/bakso.png";
import gudegImg from "@/assets/images/gudeg.png";
import indomieImg from "@/assets/images/indomie.png";
import saladImg from "@/assets/images/salad.png";
import desertImg from "@/assets/images/desert.png";
import donatImg from "@/assets/images/donat.png";
import lontongsayurImg from "@/assets/images/lontongsayur.png";

export default function UserMenu({ auth }) {
    const [likedItems, setLikedItems] = useState(new Set());
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "Semua" },
        { id: "madang", name: "Madang" },
        { id: "sarapan", name: "Sarapan" },
        { id: "snack", name: "Snack" },
    ];

    const menuItems = [
        {
            id: 1,
            name: "Ayam Geprek",
            description: "Ayam geprek dengan sambal pedas",
            price: 15000,
            category: "madang",
            image: ayamImg,
            rating: 4.2,
        },
        {
            id: 2,
            name: "Soto Ayam",
            description: "Soto ayam dengan kuah bening",
            price: 12000,
            category: "madang",
            image: sotoImg,
            rating: 4.5,
        },
        {
            id: 3,
            name: "Nasi Goreng",
            description: "Nasi goreng spesial dengan telur",
            price: 14000,
            category: "madang",
            image: nasigorengImg,
            rating: 4.7,
        },
        {
            id: 4,
            name: "Nasi ayam katsu",
            description: "Nasi ayam katsu yang disiram dengan saus teriyaki",
            price: 10000,
            category: "sarapan",
            image: nasiayamImg,
            rating: 4.3,
        },
        {
            id: 5,
            name: "Roti Bakar",
            description: "Roti bakar dengan taburan coklat dan keju",
            price: 8000,
            category: "sarapan",
            image: rotibakarImg,
            rating: 4.1,
        },
        {
            id: 6,
            name: "Pisang Goreng",
            description: "Pisang goreng crispy",
            price: 5000,
            category: "snack",
            image: pisanggorengImg,
            rating: 4.4,
        },
        {
            id: 7,
            name: "Bakso Malang",
            description: "Bakso Malang dengan kuah gurih dan bakso urat",
            price: 13000,
            category: "madang",
            image: baksoImg,
            rating: 4.6,
        },
        {
            id: 8,
            name: "Gudeg Jogja",
            description: "Gudeg khas Jogja dengan krecek dan telur",
            price: 15000,
            category: "madang",
            image: gudegImg,
            rating: 4.8,
        },
        {
            id: 9,
            name: "Indomie Spesial",
            description: "Indomie goreng dengan topping sosis dan telur",
            price: 9000,
            category: "snack",
            image: indomieImg,
            rating: 4.5,
        },
        {
            id: 10,
            name: "Salad Buah",
            description: "Salad buah segar dengan saus mayo manis",
            price: 12000,
            category: "snack",
            image: saladImg,
            rating: 4.4,
        },
        {
            id: 11,
            name: "Dessert Box",
            description: "Dessert box coklat lumer dan lembut",
            price: 10000,
            category: "snack",
            image: desertImg,
            rating: 4.3,
        },
        {
            id: 12,
            name: "Donat Kentang",
            description: "Donat kentang empuk dengan taburan gula halus",
            price: 7000,
            category: "snack",
            image: donatImg,
            rating: 4.2,
        },
        {
            id: 13,
            name: "Lontong Sayur",
            description: "Lontong sayur gurih dengan kuah santan dan telur",
            price: 11000,
            category: "sarapan",
            image: lontongsayurImg,
            rating: 4.5,
        },
    ];

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

    const filteredItems =
        activeCategory === "all"
            ? menuItems
            : menuItems.filter((item) => item.category === activeCategory);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Menu Hari Ini
                </h2>
            }
        >
            <Head title="Daftar Menu Hari Ini - Suka-Canteen" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Categories */}
                        <div className="flex overflow-x-auto pb-4 mb-6 space-x-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                                        activeCategory === category.id
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Menu Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item) => (
                                <Card
                                    key={item.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="relative">
                                        <img
                                            src={
                                                item.image || "/placeholder.svg"
                                            }
                                            alt={item.name}
                                            className="w-40 h-40 object-cover rounded-full mx-auto mt-6"
                                        />
                                        <button
                                            onClick={() => toggleLike(item.id)}
                                            className={`absolute top-3 right-3 p-2 rounded-full group transition-colors duration-150 ${
                                                likedItems.has(item.id)
                                                    ? "bg-gray-100 text-white"
                                                    : "bg-white text-gray-600 hover:bg-gray-100 "
                                            }`}
                                        >
                                            <Heart
                                                className={`w-5 h-5 transition-colors duration-150 ${
                                                    likedItems.has(item.id)
                                                        ? "fill-current text-primary"
                                                        : "hover:bg-white"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">
                                                    ★
                                                </span>
                                                <span className="text-sm">
                                                    {item.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {item.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-green-600">
                                                Rp
                                                <span className="text-lg text-black">
                                                    {item.price.toLocaleString()}
                                                </span>
                                            </span>
                                            <Button
                                                onClick={() => addToCart(item)}
                                                className="bg-primary hover:bg-primary-hover text-white"
                                                size="sm"
                                            >
                                                Tambah
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        {cartItems.length > 0 && (
                            <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-80 bg-white rounded-lg shadow-lg border p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="font-bold">Keranjang</div>
                                    <div className="text-sm text-gray-600">
                                        {totalItems} item
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-sm">Total</div>
                                    <div className="font-bold text-primary">
                                        Rp{totalPrice.toLocaleString()}
                                    </div>
                                </div>
                                <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Checkout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
