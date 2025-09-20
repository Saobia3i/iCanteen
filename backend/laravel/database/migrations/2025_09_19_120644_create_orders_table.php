<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        if (Schema::hasTable('orders')) return;   // ✅ guard
        Schema::create('orders', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->onDelete('cascade');
            $t->decimal('total', 10, 2)->default(0);
            $t->enum('status', ['pending','paid','delivered', 'served','cancelled'])->default('pending');
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
