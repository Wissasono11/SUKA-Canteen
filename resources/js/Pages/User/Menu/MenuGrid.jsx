import CardMenu from "@/Components/ui/CardMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MenuGrid({
    filteredItems,
    likedItems,
    toggleLike,
    addToCart,
    setSelectedProduct,
    setProductQuantity,
}) {
    return (
        <>
            {/* Menu Grid Mobile */}
            <div className="block sm:hidden mb-8">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1.1}
                    style={{ paddingBottom: 8 }}
                >
                    {filteredItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <CardMenu
                                item={item}
                                liked={likedItems.has(item.id)}
                                onLike={toggleLike}
                                onClick={() => {
                                    setSelectedProduct(item);
                                    setProductQuantity(1);
                                }}
                                heartSize={40}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Menu Grid Desktop */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                    <CardMenu
                        key={item.id}
                        item={item}
                        liked={likedItems.has(item.id)}
                        onLike={toggleLike}
                        onClick={() => {
                            setSelectedProduct(item);
                            setProductQuantity(1);
                        }}
                        heartSize={20}
                    />
                ))}
            </div>
        </>
    );
}
