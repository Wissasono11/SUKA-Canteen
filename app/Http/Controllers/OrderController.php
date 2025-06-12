<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        return response()->json(Order::with(['items.menuItem', 'canteen', 'customer'])->get());
    }
    public function show($id) {
        return response()->json(Order::with(['items.menuItem', 'canteen', 'customer'])->findOrFail($id));
    }
    
    // Untuk halaman order user (form pemesanan)
    public function create() {
        return inertia('User/Order');
    }

    // Untuk menyimpan pesanan dari user (beserta item dan metode pembayaran)
    public function store(Request $request) {
        $request->validate([
            'cartItems' => 'required|array|min:1',
            'payment_method' => 'required|string',
            'customerInfo.name' => 'required|string',
            'customerInfo.phone' => 'required|string',
            'orderType' => 'required|string',
        ]);
        $user = $request->user();
        $order = \App\Models\Order::create([
            'canteen_id' => $request->canteen_id ?? 1, // default, sesuaikan jika multi kantin
            'customer_id' => $user->id,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'total_amount' => collect($request->cartItems)->sum(fn($i) => $i['price'] * $i['quantity']),
            'order_type' => $request->orderType ?? ($request->customerInfo['orderType'] ?? 'dinein'),
            'customer_name' => $request->customerInfo['name'],
            'customer_phone' => $request->customerInfo['phone'],
            'note' => $request->note ?? ($request->customerInfo['note'] ?? null),
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
            'status' => 'Menunggu',
        ]);
        foreach ($request->cartItems as $item) {
            $order->items()->create([
                'menu_item_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }
        return redirect()->route('user.order.create')->with('success', 'Pesanan berhasil dibuat!');
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
        // Ambil pesanan yang sudah selesai dan sudah dibayar
        $orders = Order::with(['items.menuItem', 'canteen', 'customer'])
            ->where('status', 'Selesai')
            ->where('payment_status', 'paid')
            ->orderBy('updated_at', 'desc')
            ->get();
        return response()->json($orders);
    }
}
