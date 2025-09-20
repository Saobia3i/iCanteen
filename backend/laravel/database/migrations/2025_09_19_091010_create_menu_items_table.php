<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        if (Schema::hasTable('menu_items')) return;

        Schema::create('menu_items', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->text('description')->nullable();
            $t->decimal('price', 10, 2)->default(0);
            // local asset ফোল্ডারের key (e.g. burger, fries, pizza, smoothie, rice1, rice2...)
            $t->string('image_key')->nullable();
            // যদি ভবিষ্যতে external URL লাগে
            $t->string('image_url')->nullable();
            $t->boolean('is_available')->default(true);
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('menu_items');
    }
};
