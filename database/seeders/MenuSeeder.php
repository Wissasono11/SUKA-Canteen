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

        // Buat user dummy untuk pengguna biasa
        User::firstOrCreate([
            'email' => 'userdummy@example.com',
        ], [
            'name' => 'User Biasa',
            'password' => bcrypt('password'),
            'role' => 'user',
            'is_approved' => true,
        ]);

        // Buat beberapa kantin
        $canteens = Canteen::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        // Dummy menu untuk testing fitur (2 item saja)
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
        ];

        // Masukkan dummy menu ke kantin pertama
        $firstCanteen = $canteens->first();
        foreach ($dummyMenus as $menu) {
            $menu['canteen_id'] = $firstCanteen->id;
            Menu::create($menu);
        }
    }
}
