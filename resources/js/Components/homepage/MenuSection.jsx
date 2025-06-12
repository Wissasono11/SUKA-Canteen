"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// assets for categories
import madangImg from "@/assets/images/madang.png";
import sarapanImg from "@/assets/images/sarapan.png";
import snackImg from "@/assets/images/snack.png";
import semuaImg from "@/assets/images/semua.png";
const minumanImg = "/placeholder.svg";

// assets for recommendations
import ayamImg from "@/assets/images/ayam.png";
import sotoImg from "@/assets/images/soto.png";
import indomieImg from "@/assets/images/indomie.png";
import baksoImg from "@/assets/images/bakso.png";
import gudegImg from "@/assets/images/gudeg.png";
import nasigorengImg from "@/assets/images/nasigoreng.png";

export function MenuSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [likedItems, setLikedItems] = useState(new Set());
    const [activeCategory, setActiveCategory] = useState("Semua");

    const categories = [
        { name: "Semua", image: semuaImg },
        { name: "Madang", image: madangImg },
        { name: "Sarapan", image: sarapanImg },
        { name: "Snack", image: snackImg },
        { name: "Minuman", image: minumanImg },
    ];

    const recommendations = [
        {
            name: "Ayam Geprek",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp15.000",
            rating: 4.2,
            image: ayamImg,
            category: "Madang",
        },
        {
            name: "Soto Ayam Pak Yanto",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp12.000",
            rating: 4.9,
            image: sotoImg,
            category: "Madang",
        },
        {
            name: "Indomie Spesial",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp13.000",
            rating: 4.4,
            image: indomieImg,
            category: "Sarapan",
        },
        {
            name: "Nasi Goreng",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp12.000",
            rating: 4.6,
            image: nasigorengImg,
            category: "Sarapan",
        },
        {
            name: "Bakso Malang",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp14.000",
            rating: 4.3,
            image: baksoImg,
            category: "Snack",
        },
        {
            name: "Gudeg",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp15.500",
            rating: 4.5,
            image: gudegImg,
            category: "Minuman",
        },
    ];

    const filteredRecommendations =
        activeCategory === "Semua"
            ? recommendations
            : recommendations.filter((item) => item.category === activeCategory);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const maxSlide = isMobile
        ? recommendations.length - 1
        : Math.max(0, recommendations.length - 3);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    };

    const toggleLike = (index) => {
        setLikedItems((prev) => {
            const newLiked = new Set(prev);
            if (newLiked.has(index)) {
                newLiked.delete(index);
            } else {
                newLiked.add(index);
            }
            return newLiked;
        });
    };

    return (
        <section className="py-20 bg-background-secondary" id="menu">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Popular Categories */}
                <div className="text-center space-y-4 mb-16">
                    <p className="text-mini-text font-medium tracking-wide uppercase text-sm">
                        FAVOURITES MAHASISWA
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Kategori Populer
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-20">
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        >
                            <CardContent className="p-8 text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                                    <img
                                        src={
                                            category.image || "/placeholder.svg"
                                        }
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-text text-sm">
                                    {category.count}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recommendations */}
                <div className="space-y-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">Discover food</h2>
                        <div className="flex gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`px-7 py-3 rounded-full font-semibold focus:outline-none transition-colors ${
                                        activeCategory === cat.name
                                            ? "bg-[#5B721C] text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <div className="flex flex-wrap gap-8 justify-center">
                            {filteredRecommendations.length === 0 ? (
                                <div className="text-gray-500 text-lg">
                                    Tidak ada menu pada kategori ini.
                                </div>
                            ) : (
                                filteredRecommendations.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="bg-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden max-w-xs mx-auto"
                                    >
                                        <div className="absolute top-4 right-4 z-10">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleLike(index)}
                                                className={`rounded-full w-10 h-10 p-0 ${
                                                    likedItems.has(index)
                                                        ? "bg-primary hover:bg-primary-hover text-white"
                                                        : "bg-primary hover:bg-primary-hover text-white"
                                                }`}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${
                                                        likedItems.has(index)
                                                            ? "fill-current"
                                                            : ""
                                                    }`}
                                                />
                                            </Button>
                                        </div>
                                        <div className="w-[263px] h-[263px] mx-auto rounded-full overflow-hidden mt-8">
                                            <img
                                                src={
                                                    item.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <h4 className="text-xl font-bold text-black mb-2">
                                                {item.name}
                                            </h4>
                                            <p className="text-text mb-4">
                                                {item.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-black font-bold text-lg">
                                                    <span className="text-sm  text-green-600 align-text-bottom">
                                                        Rp
                                                    </span>
                                                    {item.price.replace(
                                                        /^Rp/,
                                                        ""
                                                    )}
                                                </span>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-yellow-400">
                                                        ★
                                                    </span>
                                                    <span className="text-text font-medium">
                                                        {item.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MenuSection;
