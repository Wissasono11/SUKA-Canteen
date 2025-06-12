import React from "react";

/**
 * Reusable button for category selection.
 * @param {string} label - The category label.
 * @param {boolean} active - Whether the button is active/selected.
 * @param {function} onClick - Click handler.
 * @param {string} className - Additional classes.
 */
export default function CategoryButton({
    label,
    active,
    onClick,
    className = "",
}) {
    return (
        <button
            type="button"
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-150 focus:outline-none ${
                active
                    ? "bg-primary text-white shadow-md hover:bg-primary-hover"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
