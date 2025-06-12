<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // Ubah kolom status di orders menjadi string agar fleksibel
        Schema::table('orders', function (Blueprint $table) {
            $table->string('status', 20)->default('Menunggu')->change();
        });
    }
    public function down(): void {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status', ['menunggu', 'diproses', 'siap', 'selesai', 'dibatalkan'])->default('menunggu')->change();
        });
    }
};
