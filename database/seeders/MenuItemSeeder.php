<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;
use App\Models\Canteen;
use App\Models\Category;
use App\Models\User;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan ada user dan kantin
        $user = User::firstOrCreate([
            'email' => 'canteenowner@example.com',
        ], [
            'name' => 'Canteen Owner',
            'password' => bcrypt('password'),
            'role' => 'canteen_owner',
            'is_approved' => true,
        ]);
        $canteen = Canteen::firstOrCreate([
            'user_id' => $user->id,
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
        $categories = [
            'madang' => Category::firstOrCreate(['name' => 'madang']),
            'sarapan' => Category::firstOrCreate(['name' => 'sarapan']),
            'snack' => Category::firstOrCreate(['name' => 'snack']),
            'minuman' => Category::firstOrCreate(['name' => 'minuman']),
        ];
        // Data dummy menu utama
        $menus = [
            [
                'name' => 'Nasi Goreng',
                'price' => 15000,
                'category_id' => $categories['madang']->id,
                'canteen_id' => $canteen->id,
                'stock' => 20,
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Mie Ayam',
                'price' => 12000,
                'category_id' => $categories['madang']->id,
                'canteen_id' => $canteen->id,
                'stock' => 15,
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Teh Manis',
                'price' => 5000,
                'category_id' => $categories['minuman']->id,
                'canteen_id' => $canteen->id,
                'stock' => 50,
                'is_available' => true,
                'image_url' => null,
            ],
            [
                'name' => 'Roti Bakar',
                'price' => 8000,
                'category_id' => $categories['snack']->id,
                'canteen_id' => $canteen->id,
                'stock' => 10,
                'is_available' => true,
                'image_url' => null,
            ],
        ];
        foreach ($menus as $menu) {
            MenuItem::firstOrCreate([
                'name' => $menu['name'],
                'canteen_id' => $canteen->id,
            ], $menu);
        }

        // Data dummy makanan/minuman khas Indonesia
        $dummyMenus = [
            [ 'name' => 'Sate Ayam', 'price' => 18000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 15, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Rendang', 'price' => 25000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 10, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Gado-Gado', 'price' => 12000, 'category_id' => $categories['sarapan']->id, 'canteen_id' => $canteen->id, 'stock' => 18, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Soto Ayam', 'price' => 14000, 'category_id' => $categories['sarapan']->id, 'canteen_id' => $canteen->id, 'stock' => 17, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Bakso', 'price' => 13000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 25, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Pecel Lele', 'price' => 15000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 13, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Ayam Geprek', 'price' => 16000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 14, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Lontong Sayur', 'price' => 11000, 'category_id' => $categories['sarapan']->id, 'canteen_id' => $canteen->id, 'stock' => 12, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Nasi Uduk', 'price' => 13000, 'category_id' => $categories['sarapan']->id, 'canteen_id' => $canteen->id, 'stock' => 16, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Sop Buntut', 'price' => 27000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 8, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Rawon', 'price' => 20000, 'category_id' => $categories['madang']->id, 'canteen_id' => $canteen->id, 'stock' => 9, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Es Teh Manis', 'price' => 4000, 'category_id' => $categories['minuman']->id, 'canteen_id' => $canteen->id, 'stock' => 40, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Es Jeruk', 'price' => 5000, 'category_id' => $categories['minuman']->id, 'canteen_id' => $canteen->id, 'stock' => 35, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Jus Alpukat', 'price' => 9000, 'category_id' => $categories['minuman']->id, 'canteen_id' => $canteen->id, 'stock' => 20, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Martabak Manis', 'price' => 12000, 'category_id' => $categories['snack']->id, 'canteen_id' => $canteen->id, 'stock' => 15, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Pisang Goreng', 'price' => 7000, 'category_id' => $categories['snack']->id, 'canteen_id' => $canteen->id, 'stock' => 30, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Klepon', 'price' => 6000, 'category_id' => $categories['snack']->id, 'canteen_id' => $canteen->id, 'stock' => 25, 'is_available' => true, 'image_url' => null ],
            [ 'name' => 'Tahu Isi', 'price' => 8000, 'category_id' => $categories['snack']->id, 'canteen_id' => $canteen->id, 'stock' => 18, 'is_available' => true, 'image_url' => null ],
        ];
        foreach ($dummyMenus as $menu) {
            MenuItem::firstOrCreate([
                'name' => $menu['name'],
                'canteen_id' => $canteen->id,
            ], $menu);
        }
        // Hapus: Perbanyak data menu item acak dengan factory
        // Selesai
    }
}
