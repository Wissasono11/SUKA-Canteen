// resources/js/Pages/CanteenOwner/Dashboard.jsx
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

export default function CanteenOwnerDashboard({ auth }) {
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Pemilik Kantin
                </h2>
            }
        >
            <Head title="Dashboard Pemilik Kantin" />

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
                            </div>

                            {activeTab === "orders" && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Pesanan Terbaru
                                    </h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((order) => (
                                            <Card
                                                key={order}
                                                className="hover:shadow-md transition-shadow"
                                            >
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="font-medium">
                                                                Order #{order}
                                                                0001
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                2 item •
                                                                Rp35.000
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Detail
                                                            </Button>
                                                            <Button
                                                                className="bg-green-600 hover:bg-green-700"
                                                                size="sm"
                                                            >
                                                                Terima
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "menu" && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">
                                            Menu Kantin
                                        </h3>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            Tambah Menu
                                        </Button>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <Card
                                                key={item}
                                                className="hover:shadow-md transition-shadow"
                                            >
                                                <CardContent className="p-0">
                                                    <img
                                                        src={`/placeholder.svg?height=150&width=300&text=Menu+${item}`}
                                                        alt={`Menu ${item}`}
                                                        className="w-full h-40 object-cover"
                                                    />
                                                    <div className="p-4">
                                                        <div className="font-medium">
                                                            Menu Item {item}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Rp15.000
                                                        </div>
                                                        <div className="flex justify-end space-x-2 mt-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                            >
                                                                Hapus
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "reports" && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Laporan Penjualan
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-sm text-gray-500">
                                                    Total Pendapatan
                                                </div>
                                                <div className="text-2xl font-bold">
                                                    Rp1.250.000
                                                </div>
                                                <div className="text-xs text-green-600">
                                                    +15% dari bulan lalu
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-sm text-gray-500">
                                                    Pesanan
                                                </div>
                                                <div className="text-2xl font-bold">
                                                    85
                                                </div>
                                                <div className="text-xs text-green-600">
                                                    +8% dari bulan lalu
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-sm text-gray-500">
                                                    Menu Terlaris
                                                </div>
                                                <div className="text-2xl font-bold">
                                                    Ayam Geprek
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    32 pesanan
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                                        <div className="text-gray-500 mb-2">
                                            Grafik penjualan akan ditampilkan di
                                            sini
                                        </div>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            Unduh Laporan
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
