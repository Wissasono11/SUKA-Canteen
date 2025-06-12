<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // Tambahkan index dan foreign key jika perlu, serta pastikan kolom tidak null
        Schema::table('order_items', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id')->change();
            $table->unsignedBigInteger('menu_item_id')->change();
            $table->integer('quantity')->default(1)->change();
            $table->decimal('price', 10, 2)->default(0)->change();
        });
    }
    public function down(): void {
        // Tidak perlu rollback khusus, biarkan default
    }
};
