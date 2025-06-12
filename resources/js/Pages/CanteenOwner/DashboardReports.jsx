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
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-gray-500 mb-2">Grafik Akumulasi Total Pendapatan</div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={reports[0]?.income_chart || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tickFormatter={v => v.slice(0,3)} />
                                <YAxis tickFormatter={v => `Rp${v}`}/>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip formatter={v => `Rp${v}`}/>
                                <Area type="monotone" dataKey="total_income" stroke="#16a34a" fillOpacity={1} fill="url(#colorIncome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4">Unduh Laporan</button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default DashboardReports;
