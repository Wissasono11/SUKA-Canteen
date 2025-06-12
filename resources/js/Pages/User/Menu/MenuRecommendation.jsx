import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MenuRecommendation({
    menus,
    setSelectedProduct,
    setProductQuantity,
}) {
    const recommended = menus.filter((item) => item.rating >= 4.5).slice(0, 3);
    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">
                From Our Recommendations{" "}
            </h3>
            {/* Mobile Slider */}
            <div className="block sm:hidden mb-8">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1.1}
                    style={{ paddingBottom: 8 }}
                >
                    {recommended.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="bg-white rounded-xl shadow border p-6 flex flex-col w-full max-w-xs min-w-[220px] cursor-pointer hover:shadow-lg transition"
                                onClick={() => {
                                    setSelectedProduct(item);
                                    setProductQuantity(1);
                                }}
                            >
                                <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                                    <img
                                        src={item.image || "/placeholder.svg"}
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Desktop Flex */}
            <div className="hidden sm:flex flex-wrap gap-6">
                {recommended.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow border p-6 flex flex-row items-center w-full max-w-md min-w-[320px] cursor-pointer hover:shadow-lg transition"
                        onClick={() => {
                            setSelectedProduct(item);
                            setProductQuantity(1);
                        }}
                    >
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mr-6">
                            <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="font-bold text-lg mb-1">
                                {item.name}
                            </div>
                            <div className="text-gray-500 text-sm mb-2">
                                Starting From
                            </div>
                            <div className="font-bold text-xl text-black mb-2">
                                Rp {item.price.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
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
    );
}
