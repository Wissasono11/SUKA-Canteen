<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Ubah enum status menjadi hanya 'Menunggu', 'Proses', 'Selesai'
        DB::statement("ALTER TABLE orders MODIFY status ENUM('Menunggu', 'Proses', 'Selesai') NOT NULL DEFAULT 'Menunggu'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kembalikan enum status ke versi sebelumnya jika perlu
        DB::statement("ALTER TABLE orders MODIFY status ENUM('menunggu', 'diproses', 'siap', 'selesai', 'dibatalkan') NOT NULL DEFAULT 'menunggu'");
    }
};
