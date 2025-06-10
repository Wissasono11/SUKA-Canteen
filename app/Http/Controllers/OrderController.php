<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Menu;
use App\Models\Canteen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $cart = $request->input('cart', []);
        $canteens = \App\Models\Canteen::all();
        return Inertia::render('User/Order', [
            'auth' => [
                'user' => \Illuminate\Support\Facades\Auth::user(),
            ],
            'cart' => $cart,
            'canteens' => $canteens,
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'canteen_id' => 'required|exists:canteens,id',
            'items' => 'required|array',
            'items.*.menu_id' => 'required|exists:menus,id',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
            'total_price' => 'required|integer',
            'delivery_method' => 'required|in:pickup,delivery',
        ]);
        $order = Order::create([
            'user_id' => Auth::id(),
            'canteen_id' => $data['canteen_id'],
            'items' => $data['items'],
            'total_price' => $data['total_price'],
            'delivery_method' => $data['delivery_method'],
            'status' => 'pending',
        ]);
        return redirect()->route('user.menu')->with('success', 'Pesanan berhasil dibuat!');
    }
}
