<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('canteen_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('canteen_id')->constrained()->onDelete('cascade');
            $table->string('setting_type');
            $table->text('setting_value');
            $table->timestamps();
            $table->unique(['canteen_id', 'setting_type']);
        });
    }
    public function down(): void {
        Schema::dropIfExists('canteen_settings');
    }
};
