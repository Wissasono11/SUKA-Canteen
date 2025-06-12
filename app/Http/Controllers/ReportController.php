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
        $total_income = Order::sum('total_amount');
        // Total pesanan
        $total_orders = Order::count();
        // Menu terlaris
        $top_menu = OrderItem::select('menu_item_id', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('menu_item_id')
            ->orderByDesc('total_qty')
            ->first();
        $top_menu_name = ($top_menu && $top_menu->menu_item_id) ? (MenuItem::find($top_menu->menu_item_id)->name ?? '-') : '-';
        // Grafik tetap dinonaktifkan
        return response()->json([
            'total_income' => $total_income,
            'total_orders' => $total_orders,
            'top_menu' => $top_menu_name,
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
