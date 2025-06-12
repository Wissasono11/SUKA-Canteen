<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('canteens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // relasi user_id
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('address');
            $table->string('phone');
            $table->time('opening_time')->default('07:00');
            $table->time('closing_time')->default('17:00');
            $table->json('operational_days')->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('canteens');
    }
};
