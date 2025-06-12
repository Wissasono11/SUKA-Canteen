// resources/js/Pages/CanteenOwner/Dashboard.jsx
import { useState, useRef } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DashboardOrders from "./DashboardOrders";
import DashboardMenu from "./DashboardMenu";
import DashboardReports from "./DashboardReports";
import DashboardOrderHistory from "./DashboardOrderHistory";
import CanteenProfileModal from "./CanteenProfileModal";

export default function CanteenOwnerDashboard({ auth, canteen }) {
    // Tambahkan fallback jika auth atau auth.user tidak ada
    if (!auth || !auth.user) {
        return <div className="text-center text-red-500 py-10">Data user tidak ditemukan. Silakan login ulang.</div>;
    }
    const [activeTab, setActiveTab] = useState("orders");
    const [showProfile, setShowProfile] = useState(false);
    const reportsRef = useRef();

    // Fungsi untuk trigger refresh report
    const handleOrderCompleted = () => {
        if (reportsRef.current && reportsRef.current.refreshReport) {
            reportsRef.current.refreshReport();
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard Pemilik Kantin
                    </h2>
                    <button
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => setShowProfile(true)}
                    >
                        Profile
                    </button>
                </div>
            }
        >
            <Head title="Dashboard Pemilik Kantin" />
            <CanteenProfileModal open={showProfile} onClose={() => setShowProfile(false)} user={auth.user} canteen={canteen} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex border-b mb-6">
                                <button
                                    className={`pb-4 px-4 ${
                                        activeTab === "orders"
                                            ? "border-b-2 border-green-600 text-green-600"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() => setActiveTab("orders")}
                                >
                                    Pesanan
                                </button>
                                <button
                                    className={`pb-4 px-4 ${
                                        activeTab === "menu"
                                            ? "border-b-2 border-green-600 text-green-600"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() => setActiveTab("menu")}
                                >
                                    Menu
                                </button>
                                <button
                                    className={`pb-4 px-4 ${
                                        activeTab === "reports"
                                            ? "border-b-2 border-green-600 text-green-600"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() => setActiveTab("reports")}
                                >
                                    Laporan
                                </button>
                                <button
                                    className={`pb-4 px-4 ${
                                        activeTab === "history"
                                            ? "border-b-2 border-green-600 text-green-600"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() => setActiveTab("history")}
                                >
                                    Riwayat Pesanan
                                </button>
                            </div>
                            {activeTab === "orders" && <DashboardOrders onOrderCompleted={handleOrderCompleted} />}
                            {activeTab === "menu" && <DashboardMenu />}
                            {activeTab === "reports" && <DashboardReports ref={reportsRef} />}
                            {activeTab === "history" && <DashboardOrderHistory />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
