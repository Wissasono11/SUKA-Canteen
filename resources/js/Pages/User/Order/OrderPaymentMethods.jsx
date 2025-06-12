import React from "react";
import mastercard from "@/assets/svg/Mastercard.svg";
import gopay from "@/assets/svg/Gopay.svg";
import dana from "@/assets/svg/DANA.svg";
import ovo from "@/assets/svg/OVO.svg";
import qris from "@/assets/svg/QRIS.svg";
import ewalletIcon from "@/assets/svg/ewallet.svg";
import tunai from "@/assets/svg/tunai.png";
import { Button } from "@/Components/ui/button";

export default function OrderPaymentMethods({
    paymentMethod,
    setPaymentMethod,
    ewalletDropdownOpen,
    setEwalletDropdownOpen,
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
            {/* Tunai */}
            <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all shadow-sm w-full text-left focus:outline-none \
                    ${
                        paymentMethod === "cash"
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 bg-white hover:bg-green-50 active:bg-green-100"
                    }`}
                aria-pressed={paymentMethod === "cash"}
            >
                <img
                    src={tunai}
                    alt="Tunai"
                    className="w-10 h-10 object-contain"
                />
                <div>
                    <div
                        className={`font-bold text-lg ${
                            paymentMethod === "cash"
                                ? "text-black"
                                : "text-gray-800"
                        }`}
                    >
                        Cash
                    </div>
                </div>
            </button>
            {/* Card */}
            <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all shadow-sm w-full text-left focus:outline-none \
                    ${
                        paymentMethod === "card"
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 bg-white hover:bg-blue-50 active:bg-blue-100"
                    }`}
                aria-pressed={paymentMethod === "card"}
            >
                <img
                    src={mastercard}
                    alt="Card"
                    className="w-10 h-10 object-contain"
                />
                <div>
                    <div
                        className={`font-bold text-lg ${
                            paymentMethod === "card"
                                ? "text-black"
                                : "text-gray-800"
                        }`}
                    >
                        Kartu
                    </div>
                    <div className="text-xs text-gray-500 font-semibold">
                        Debit/Kredit
                    </div>
                </div>
            </button>
            {/* E-wallet as dropdown button with logo */}
            <div className="relative w-full">
                <button
                    type="button"
                    onClick={() => setEwalletDropdownOpen((open) => !open)}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all shadow-sm w-full text-left focus:outline-none \
                    ${
                        paymentMethod.startsWith("ewallet")
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 bg-white hover:bg-indigo-50 active:bg-indigo-100"
                    }`}
                    aria-pressed={paymentMethod.startsWith("ewallet")}
                >
                    <img
                        src={ewalletIcon}
                        alt="E-Wallet"
                        className="w-10 h-10 object-contain"
                    />
                    <div>
                        <div
                            className={`font-bold text-lg ${
                                paymentMethod.startsWith("ewallet")
                                    ? "text-black"
                                    : "text-gray-800"
                            }`}
                        >
                            E-Wallet
                        </div>
                        <div className="text-xs text-gray-500 font-semibold">
                            {paymentMethod === "ewallet-gopay" && "Gopay"}
                            {paymentMethod === "ewallet-dana" && "Dana"}
                            {paymentMethod === "ewallet-ovo" && "OVO"}
                            {(!paymentMethod.startsWith("ewallet-") ||
                                paymentMethod === "ewallet") &&
                                "Pilih E-Wallet"}
                        </div>
                    </div>
                    <svg
                        className="ml-auto w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {ewalletDropdownOpen && (
                    <div className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        <button
                            type="button"
                            onClick={() => {
                                setPaymentMethod("ewallet-gopay");
                                setEwalletDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 transition text-left ${
                                paymentMethod === "ewallet-gopay"
                                    ? "bg-primary/10"
                                    : ""
                            }`}
                        >
                            <img
                                src={gopay}
                                alt="Gopay"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="font-semibold">Gopay</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setPaymentMethod("ewallet-dana");
                                setEwalletDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 transition text-left ${
                                paymentMethod === "ewallet-dana"
                                    ? "bg-primary/10"
                                    : ""
                            }`}
                        >
                            <img
                                src={dana}
                                alt="Dana"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="font-semibold">Dana</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setPaymentMethod("ewallet-ovo");
                                setEwalletDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 transition text-left ${
                                paymentMethod === "ewallet-ovo"
                                    ? "bg-primary/10"
                                    : ""
                            }`}
                        >
                            <img
                                src={ovo}
                                alt="OVO"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="font-semibold">OVO</span>
                        </button>
                    </div>
                )}
            </div>
            {/* QRIS */}
            <button
                type="button"
                onClick={() => setPaymentMethod("qris")}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all shadow-sm w-full text-left focus:outline-none \
                    ${
                        paymentMethod === "qris"
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 bg-white hover:bg-yellow-50 active:bg-yellow-100"
                    }`}
                aria-pressed={paymentMethod === "qris"}
            >
                <img
                    src={qris}
                    alt="QRIS"
                    className="w-10 h-10 object-contain"
                />
                <div>
                    <div
                        className={`font-bold text-lg ${
                            paymentMethod === "qris"
                                ? "text-black"
                                : "text-gray-800"
                        }`}
                    >
                        QRIS
                    </div>
                </div>
            </button>
        </div>
    );
}
