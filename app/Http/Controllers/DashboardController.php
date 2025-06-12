<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\MenuItem;
use App\Models\Canteen;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getOverviewStats()
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $todayOrders = Order::whereDate('created_at', $today)->get();
        $yesterdayOrders = Order::whereDate('created_at', $yesterday)->get();

        $totalOrdersToday = $todayOrders->count();
        $totalOrdersYesterday = $yesterdayOrders->count();

        $totalRevenueToday = $todayOrders->sum('total_amount');
        $totalRevenueYesterday = $yesterdayOrders->sum('total_amount');

        $activeMenuItems = MenuItem::where('is_available', true)->count();
        $activeMenuItemsYesterday = MenuItem::whereDate('updated_at', $yesterday)
            ->where('is_available', true)->count();

        $averageRating = Canteen::avg('rating') ?? 4.5;
        $yesterdayRating = 4.3;

        return response()->json([
            'stats' => [
                'totalOrders' => [
                    'value' => $totalOrdersToday,
                    'change' => $totalOrdersYesterday > 0 
                        ? round(($totalOrdersToday - $totalOrdersYesterday) / $totalOrdersYesterday * 100, 1) 
                        : 0,
                ],
                'totalRevenue' => [
                    'value' => $totalRevenueToday,
                    'change' => $totalRevenueYesterday > 0 
                        ? round(($totalRevenueToday - $totalRevenueYesterday) / $totalRevenueYesterday * 100, 1) 
                        : 0,
                ],
                'activeMenuItems' => [
                    'value' => $activeMenuItems,
                    'change' => $activeMenuItemsYesterday - $activeMenuItems,
                ],
                'rating' => [
                    'value' => $averageRating,
                    'change' => round($averageRating - $yesterdayRating, 1),
                ],
            ]
        ]);
    }

    public function getRecentOrders()
    {
        $recentOrders = Order::with(['customer', 'items.menuItem'])
            ->whereDate('created_at', Carbon::today())
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->order_number,
                    'customer' => $order->customer->name,
                    'items' => $order->items->map(function ($item) {
                        return $item->menuItem->name;
                    })->implode(', '),
                    'total' => $order->total_amount,
                    'status' => $order->status,
                    'time' => Carbon::parse($order->created_at)->format('H:i'),
                ];
            });

        return response()->json([
            'orders' => $recentOrders
        ]);
    }
}
