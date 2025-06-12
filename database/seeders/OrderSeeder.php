<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use App\Models\User;
use App\Models\Canteen;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil user customer dan owner
        $owner = User::firstOrCreate([
            'email' => 'canteenowner@example.com',
        ], [
            'name' => 'Canteen Owner',
            'password' => bcrypt('password'),
            'role' => 'canteen_owner',
            'is_approved' => true,
        ]);
        $customer = User::firstOrCreate([
            'email' => 'customer@example.com',
        ], [
            'name' => 'Customer Suka',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);
        $canteen = Canteen::firstOrCreate([
            'user_id' => $owner->id,
        ], [
            'name' => 'Kantin Suka Maju',
            'description' => 'Kantin favorit di kampus',
            'address' => 'Jl. Kampus No. 1',
            'phone' => '08123456789',
            'opening_time' => '08:00',
            'closing_time' => '16:00',
            'operational_days' => json_encode(['Senin','Selasa','Rabu','Kamis','Jumat']),
            'rating' => 4.5,
        ]);
        $menuItems = MenuItem::where('canteen_id', $canteen->id)->get();
        $statuses = ['pending', 'paid', 'processing', 'ready', 'delivered', 'cancelled'];
        for ($i = 1; $i <= 10; $i++) {
            $itemCount = rand(1, 3);
            $picked = $menuItems->random($itemCount);
            $total = 0;
            $order = Order::create([
                'canteen_id' => $canteen->id,
                'customer_id' => $customer->id,
                'order_number' => 'ORD-' . strtoupper(Str::random(6)),
                'total_amount' => 0, // akan diupdate setelah item
                'order_type' => ['dinein', 'takeaway'][rand(0,1)],
                'customer_name' => $customer->name,
                'customer_phone' => '0812345678' . rand(0,9),
                'note' => null, // tidak ada dummy note lorem
                'payment_method' => ['cash','debit','e_wallet','qris'][rand(0,3)],
                'payment_status' => ['pending','paid'][rand(0,1)],
                'status' => ['Menunggu','Proses','Selesai'][rand(0,2)],
            ]);
            foreach ($picked as $item) {
                $qty = rand(1, 3);
                $order->items()->create([
                    'menu_item_id' => $item->id,
                    'quantity' => $qty,
                    'price' => $item->price,
                ]);
                $total += $item->price * $qty;
            }
            $order->total_amount = $total;
            $order->save();
        }
    }
}
