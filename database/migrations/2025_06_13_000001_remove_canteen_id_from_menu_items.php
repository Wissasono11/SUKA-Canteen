<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // Sudah tidak ada kolom canteen_id, tidak perlu melakukan apapun
    }
    public function down(): void {
        // Tidak perlu rollback kolom canteen_id
    }
};
