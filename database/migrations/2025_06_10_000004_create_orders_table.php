<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('canteen_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->integer('total_amount');
            $table->enum('order_type', ['dinein', 'takeaway']);
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->text('note')->nullable();
            $table->string('payment_method');
            $table->enum('payment_status', ['pending', 'paid'])->default('pending');
            $table->enum('status', ['Menunggu', 'Proses', 'Selesai'])->default('Menunggu');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
