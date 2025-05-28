import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#5B721C",
                "primary-pastel": "#D6DBC6",
                "primary-hover": "#4A5A14",
                secondary: "#F2F2F2",
                "secondary-hover": "#E0E0E0",
                "background-primary": "#ffffff",
                "background-secondary": "#F8F8F8",
                text: "#555",
                "mini-text": "#FF6868",
            },
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
