<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->default(0)->change();
            $table->integer('stock')->default(0)->change();
            $table->boolean('is_available')->default(true)->change();
            $table->string('image_url')->nullable()->change();
        });
    }
    public function down(): void {
        // Tidak perlu rollback khusus, biarkan default
    }
};
