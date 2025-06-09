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

    const categories = [
        {
            name: "Madang",
            count: "(25 menu)",
            image: madangImg,
        },
        {
            name: "Sarapan",
            count: "(15 sarapan)",
            image: sarapanImg,
        },
        {
            name: "Snack",
            count: "(35 cemilan)",
            image: snackImg,
        },
        {
            name: "Semua",
            count: "(86 items)",
            image: semuaImg,
        },
    ];

    const recommendations = [
        {
            name: "Ayam Geprek",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp15.000",
            rating: 4.2,
            image: ayamImg,
        },
        {
            name: "Soto Ayam Pak Yanto",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp12.000",
            rating: 4.9,
            image: sotoImg,
        },
        {
            name: "Indomie Spesial",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp13.000",
            rating: 4.4,
            image: indomieImg,
        },
        {
            name: "Nasi Goreng",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp12.000",
            rating: 4.6,
            image: nasigorengImg,
        },
        {
            name: "Bakso Malang",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp14.000",
            rating: 4.3,
            image: baksoImg,
        },
        {
            name: "Gudeg",
            description: "Lorem Ipsum Sir Amet",
            price: "Rp15.500",
            rating: 4.5,
            image: gudegImg,
        },
    ];

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
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-red-400 font-medium tracking-wide uppercase text-sm mb-2">
                                PILIHAN MENU
                            </p>
                            <h3 className="text-2xl lg:text-3xl font-bold text-black">
                                Rekomendasi Madang Dari Kami
                            </h3>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={prevSlide}
                                className="bg-white rounded-full w-10 h-10 p-0 hover:bg-background-secondary hover:shadow-md"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={nextSlide}
                                className="bg-primary rounded-full w-10 h-10 p-0 hover:bg-primary-hover hover:shadow-md"
                            >
                                <ChevronRight className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                // Mobile: 100% per slide, Desktop: 100/3% per slide
                                transform: `translateX(-${
                                    currentSlide *
                                    (window.innerWidth < 768 ? 100 : 100 / 3)
                                }%)`,
                            }}
                        >
                            {recommendations.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/3 flex-shrink-0 px-0 md:px-4"
                                >
                                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden max-w-xs mx-auto">
                                        <div className="absolute top-4 right-4 z-10">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    toggleLike(index)
                                                }
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
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center space-x-2 mt-8">
                        {Array.from({
                            length:
                                window.innerWidth < 768
                                    ? recommendations.length // mobile: 6 dots
                                    : Math.max(1, recommendations.length - 2), // desktop: 4 dots (6-2)
                        }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    currentSlide === index
                                        ? "bg-primary"
                                        : "bg-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MenuSection;
