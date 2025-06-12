import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DashboardReports = forwardRef(function DashboardReports(props, ref) {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fungsi untuk refresh data report
    const refreshReport = () => {
        setLoading(true);
        fetch("/api/reports", { headers: { Accept: "application/json" }, credentials: 'include' })
            .then(res => res.json())
            .then(data => setReports(data))
            .catch(() => setReports([]))
            .finally(() => setLoading(false));
    };

    useImperativeHandle(ref, () => ({ refreshReport }));

    useEffect(() => {
        refreshReport();
    }, []);

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Laporan Penjualan</h3>
            {loading ? <div>Loading...</div> : (
                <div>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-sm text-gray-500">Total Pendapatan</div>
                                <div className="text-2xl font-bold">Rp{reports[0]?.total_income || 0}</div>
                                <div className="text-xs text-green-600">+15% dari bulan lalu</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-sm text-gray-500">Pesanan</div>
                                <div className="text-2xl font-bold">{reports[0]?.total_orders || 0}</div>
                                <div className="text-xs text-green-600">+8% dari bulan lalu</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-sm text-gray-500">Menu Terlaris</div>
                                <div className="text-2xl font-bold">{reports[0]?.top_menu || '-'}</div>
                                <div className="text-xs text-gray-500">-</div>
                            </CardContent>
                        </Card>
                    </div>
                                    </div>
            )}
        </div>
    );
});

export default DashboardReports;
