<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\Canteen;
use App\Models\User;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Buat user pemilik kantin dummy jika belum ada
        $user = User::firstOrCreate([
            'email' => 'canteenowner@example.com',
        ], [
            'name' => 'Pemilik Kantin',
            'password' => bcrypt('password'),
            'role' => 'canteen_owner',
            'is_approved' => true,
        ]);

        // Buat beberapa kantin
        $canteens = Canteen::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        // Dummy menu untuk testing fitur (5 item)
        $dummyMenus = [
            [
                'name' => 'Nasi Goreng Spesial',
                'description' => 'Nasi goreng dengan telur, ayam, dan kerupuk, porsi besar.',
                'price' => 18000,
                'category' => 'madang',
                'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Mie Ayam Bakso',
                'description' => 'Mie ayam dengan bakso sapi, sayur segar, dan kuah gurih.',
                'price' => 15000,
                'category' => 'madang',
                'rating' => 4.5,
                'image' => 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Roti Bakar Coklat Keju',
                'description' => 'Roti bakar isi coklat dan keju, cocok untuk sarapan atau snack.',
                'price' => 12000,
                'category' => 'snack',
                'rating' => 4.3,
                'image' => 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Es Teh Manis Jumbo',
                'description' => 'Es teh manis segar ukuran jumbo, cocok untuk makan siang.',
                'price' => 6000,
                'category' => 'minuman',
                'rating' => 4.6,
                'image' => 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Nasi Uduk Komplit',
                'description' => 'Nasi uduk dengan ayam goreng, telur, tempe, dan sambal.',
                'price' => 20000,
                'category' => 'madang',
                'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80',
            ],
        ];

        // Masukkan dummy menu ke kantin pertama
        $firstCanteen = $canteens->first();
        foreach ($dummyMenus as $menu) {
            $menu['canteen_id'] = $firstCanteen->id;
            \App\Models\Menu::create($menu);
        }

        // Untuk setiap kantin, buat beberapa menu dari factory
        foreach ($canteens as $canteen) {
            Menu::factory()->count(2)->create([
                'canteen_id' => $canteen->id,
            ]);
        }
    }
}