import { Heart } from "lucide-react";

export default function HeartButton({
    liked,
    onClick,
    className = "",
    size = 40,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full flex items-center justify-center transition-colors duration-150 focus:outline-none ${className}`}
            style={{
                boxShadow: "none",
                border: "none",
                background: "none",
                width: size,
                height: size,
            }}
        >
            <Heart
                className={`transition-colors duration-150 ${
                    liked ? "text-red-500" : "text-gray-400"
                }`}
                strokeWidth={2}
                width={size - 8}
                height={size - 8}
                fill={liked ? "#ef4444" : "none"}
                style={{
                    filter: liked ? "drop-shadow(0 0 2px #ef4444)" : "none",
                }}
            />
        </button>
    );
}
