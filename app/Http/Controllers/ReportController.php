<?php
namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index() {
        // Total pendapatan
        $total_income = Order::where('status', 'Selesai')->sum('total_amount');
        // Total pesanan
        $total_orders = Order::where('status', 'Selesai')->count();
        // Menu terlaris
        $top_menu = OrderItem::select('menu_item_id', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('menu_item_id')
            ->orderByDesc('total_qty')
            ->first();
        $top_menu_name = $top_menu ? MenuItem::find($top_menu->menu_item_id)->name : '-';
        // Grafik pendapatan bulanan (12 bulan terakhir)
        $income_chart = Order::where('status', 'Selesai')
            ->select(DB::raw('DATE_FORMAT(created_at, "%M") as month'), DB::raw('SUM(total_amount) as total_income'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy(DB::raw('MIN(created_at)'))
            ->get();
        return response()->json([
            [
                'total_income' => $total_income,
                'total_orders' => $total_orders,
                'top_menu' => $top_menu_name,
                'income_chart' => $income_chart,
            ]
        ]);
    }
    public function show($id) {
        return response()->json(Report::with('canteen')->findOrFail($id));
    }
    public function store(Request $request) {
        $report = Report::create($request->all());
        return response()->json($report, 201);
    }
    public function update(Request $request, $id) {
        $report = Report::findOrFail($id);
        $report->update($request->all());
        return response()->json($report);
    }
    public function destroy($id) {
        Report::destroy($id);
        return response()->json(null, 204);
    }
}
