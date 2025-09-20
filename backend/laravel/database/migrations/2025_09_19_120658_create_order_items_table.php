<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        if (Schema::hasTable('order_items')) return;  // ✅ guard
        Schema::create('order_items', function (Blueprint $t) {
            $t->id();
            $t->foreignId('order_id')->constrained()->onDelete('cascade');
            $t->foreignId('menu_item_id')->constrained()->onDelete('restrict');
            $t->integer('qty')->default(1);
            $t->decimal('price', 10, 2);
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('order_items');
    }
};
