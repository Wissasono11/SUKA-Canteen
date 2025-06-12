import CategoryButton from "@/Components/ui/CategoryButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MenuCategoryBar({
    categories,
    activeCategory,
    setActiveCategory,
}) {
    return (
        <>
            {/* Kategori Slider Mobile */}
            <div className="block sm:hidden mb-8">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={4}
                    freeMode={true}
                    breakpoints={{
                        320: { slidesPerView: 4 },
                        400: { slidesPerView: 4 },
                        500: { slidesPerView: 4 },
                        640: { slidesPerView: 4 },
                    }}
                    style={{ paddingBottom: 8 }}
                >
                    {categories.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <CategoryButton
                                label={cat.name}
                                active={activeCategory === cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                marginClass="mx-0"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Kategori Flex Desktop */}
            <div className="hidden sm:block mb-8 overflow-x-auto sm:overflow-visible">
                <div
                    className="flex sm:flex-wrap gap-3 whitespace-nowrap sm:whitespace-normal"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {categories.map((cat) => (
                        <CategoryButton
                            key={cat.id}
                            label={cat.name}
                            active={activeCategory === cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
