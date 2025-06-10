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

        // Untuk setiap kantin, buat beberapa menu
        foreach ($canteens as $canteen) {
            Menu::factory()->count(8)->create([
                'canteen_id' => $canteen->id,
            ]);
        }
    }
}
