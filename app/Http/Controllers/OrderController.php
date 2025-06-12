<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        return response()->json(Order::with(['items.menuItem', 'customer'])->get());
    }
    public function show($id) {
        return response()->json(Order::with(['items.menuItem', 'customer'])->findOrFail($id));
    }
    
    // Untuk halaman order user (form pemesanan)
    public function create() {
        return inertia('User/Order');
    }

    // Untuk menyimpan pesanan dari user (beserta item dan metode pembayaran)
    public function store(Request $request) {
        $request->validate([
            'items' => 'required|array|min:1',
            'payment_method' => 'required|string',
            'customer_name' => 'required|string',
            'order_type' => 'required|string',
        ]);
        $user = $request->user();
        $order = \App\Models\Order::create([
            'customer_id' => $user ? $user->id : null,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'total_amount' => $request->total ?? collect($request->items)->sum(fn($i) => $i['price'] * $i['quantity']),
            'order_type' => $request->order_type,
            'customer_name' => $request->customer_name,
            'note' => $request->note ?? null,
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
            'status' => 'Menunggu',
        ]);
        foreach ($request->items as $item) {
            $order->items()->create([
                'menu_item_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'note' => $item['note'] ?? null,
            ]);
        }
        $order->load(['items.menuItem', 'customer']);
        if ($request->expectsJson()) {
            return response()->json(['order' => $order], 201);
        } else {
            // Inertia request: redirect with order as prop
            return redirect()->route('user.order.create')->with(['success' => 'Pesanan berhasil dibuat!', 'order' => $order]);
        }
    }
    public function update(Request $request, $id) {
        $order = Order::findOrFail($id);
        $data = $request->all();
        // Normalisasi status ke kapital di depan
        if (isset($data['status'])) {
            $status = ucfirst(strtolower($data['status']));
            if (in_array($status, ['Menunggu', 'Proses', 'Selesai'])) {
                $data['status'] = $status;
            } else if ($status === 'Completed') {
                $data['status'] = 'Selesai';
            } else if ($status === 'Pending') {
                $data['status'] = 'Menunggu';
            } else if ($status === 'Diproses') {
                $data['status'] = 'Proses';
            }
        }
        $order->update($data);
        return response()->json($order);
    }
    public function destroy($id) {
        Order::destroy($id);
        return response()->json(null, 204);
    }

    // Endpoint untuk riwayat pesanan (order history)
    public function history(Request $request) {
        // Ambil semua pesanan (riwayat)
        $orders = Order::with(['items.menuItem', 'customer'])
            ->orderBy('updated_at', 'desc')
            ->get();
        return response()->json($orders);
    }
}
