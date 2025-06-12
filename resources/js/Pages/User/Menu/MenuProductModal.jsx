import { Button } from "@/Components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function MenuProductModal({
    selectedProduct,
    setSelectedProduct,
    productQuantity,
    setProductQuantity,
    addToCart,
}) {
    if (!selectedProduct) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-md sm:max-w-4xl relative flex flex-col md:flex-row gap-4 sm:gap-8 mx-2 sm:mx-0">
                <button
                    className="absolute top-3 right-3 sm:top-5 sm:right-5 text-2xl text-gray-700 hover:text-black hover:bg-gray-200 z-10 px-2  rounded-full"
                    onClick={() => setSelectedProduct(null)}
                    aria-label="Close"
                >
                    ×
                </button>
                <button
                    className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2 text-lg font-medium z-10 hover:text-black hover:bg-gray-200 px-2 rounded-full"
                    onClick={() => setSelectedProduct(null)}
                >
                    <span className="text-xl">←</span> Back
                </button>
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src={selectedProduct.image || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        className="w-40 h-40 sm:w-80 sm:h-80 object-cover rounded-full bg-gray-100 mt-8 sm:mt-0"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 flex items-center gap-2">
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
                    <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">
                        {selectedProduct.description}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 text-xl hover:bg-gray-100"
                            onClick={() =>
                                setProductQuantity((q) => Math.max(1, q - 1))
                            }
                        >
                            <span className="text-lg">-</span>
                        </Button>
                        <span className="text-lg sm:text-xl font-semibold  text-black w-10 sm:w-14 h-8 flex items-center justify-center rounded-full text-center">
                            {productQuantity}
                        </span>
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 text-xl hover:bg-gray-100"
                            onClick={() => setProductQuantity((q) => q + 1)}
                        >
                            <span className="text-lg">+</span>
                        </Button>
                    </div>
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <span className="text-gray-600">Total Price</span>
                        <span className="text-xl sm:text-2xl font-bold">
                            <span className="text-green-600 text-sm font-bold">
                                Rp
                            </span>
                            <span className="text-black font-bold">
                                {(
                                    selectedProduct.price * productQuantity
                                ).toLocaleString()}
                            </span>
                        </span>
                    </div>
                    <Button
                        className="w-full bg-primary hover:bg-primary-hover text-white py-4 sm:py-6 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center gap-2 mt-2"
                        onClick={() => {
                            addToCart({
                                ...selectedProduct,
                                quantity: productQuantity,
                            });
                            setSelectedProduct(null);
                        }}
                    >
                        <ShoppingCart className="w-6 h-6 mr-1" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
