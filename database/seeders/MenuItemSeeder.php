<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;
use App\Models\Category;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
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
                'stock' => 20,
                'is_available' => true,
                'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Mie Ayam',
                'price' => 12000,
                'category_id' => $categories['madang']->id,
                'stock' => 15,
                'is_available' => true,
                'image_url' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Teh Manis',
                'price' => 5000,
                'category_id' => $categories['minuman']->id,
                'stock' => 50,
                'is_available' => true,
                'image_url' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Roti Bakar',
                'price' => 8000,
                'category_id' => $categories['snack']->id,
                'stock' => 10,
                'is_available' => true,
                'image_url' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
            ],
        ];
        foreach ($menus as $menu) {
            MenuItem::firstOrCreate([
                'name' => $menu['name'],
            ], $menu);
        }
        // Data dummy makanan/minuman khas Indonesia
        $dummyMenus = [
            [ 'name' => 'Sate Ayam', 'price' => 18000, 'category_id' => $categories['madang']->id, 'stock' => 15, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Rendang', 'price' => 25000, 'category_id' => $categories['madang']->id, 'stock' => 10, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Gado-Gado', 'price' => 12000, 'category_id' => $categories['sarapan']->id, 'stock' => 18, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Soto Ayam', 'price' => 14000, 'category_id' => $categories['sarapan']->id, 'stock' => 17, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Bakso', 'price' => 13000, 'category_id' => $categories['madang']->id, 'stock' => 25, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Pecel Lele', 'price' => 15000, 'category_id' => $categories['madang']->id, 'stock' => 13, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Ayam Geprek', 'price' => 16000, 'category_id' => $categories['madang']->id, 'stock' => 14, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Lontong Sayur', 'price' => 11000, 'category_id' => $categories['sarapan']->id, 'stock' => 12, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Nasi Uduk', 'price' => 13000, 'category_id' => $categories['sarapan']->id, 'stock' => 16, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Sop Buntut', 'price' => 27000, 'category_id' => $categories['madang']->id, 'stock' => 8, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Rawon', 'price' => 20000, 'category_id' => $categories['madang']->id, 'stock' => 9, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Es Teh Manis', 'price' => 4000, 'category_id' => $categories['minuman']->id, 'stock' => 40, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Es Jeruk', 'price' => 5000, 'category_id' => $categories['minuman']->id, 'stock' => 35, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Jus Alpukat', 'price' => 9000, 'category_id' => $categories['minuman']->id, 'stock' => 20, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Martabak Manis', 'price' => 12000, 'category_id' => $categories['snack']->id, 'stock' => 15, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Pisang Goreng', 'price' => 7000, 'category_id' => $categories['snack']->id, 'stock' => 30, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Klepon', 'price' => 6000, 'category_id' => $categories['snack']->id, 'stock' => 25, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' ],
            [ 'name' => 'Tahu Isi', 'price' => 8000, 'category_id' => $categories['snack']->id, 'stock' => 18, 'is_available' => true, 'image_url' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' ],
        ];
        foreach ($dummyMenus as $menu) {
            MenuItem::firstOrCreate([
                'name' => $menu['name'],
            ], $menu);
        }
    }
}
