<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\MenuItem;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // --- Seed Staff User (idempotent) ---
        User::firstOrCreate(
            ['email' => 'staff@canteen.com'],
            [
                'name'     => 'Staff',
                'password' => 'staff123',   // User model casts 'password' => 'hashed' হলে এটি auto-hash হবে
                'role'     => 'staff',
            ]
        );

        // --- Seed Menu Items (idempotent) ---
        $seed = [
            ['name'=>'Burger',   'description'=>'Juicy and cheesy',          'price'=>199, 'image_key'=>'burger'],
            ['name'=>'Fries',    'description'=>'Crispy and golden',         'price'=> 99, 'image_key'=>'Fries'],
            ['name'=>'Pizza',    'description'=>'Hot and cheesy slices',     'price'=>299, 'image_key'=>'pizza'],
            ['name'=>'Smoothie', 'description'=>'Fresh fruit blends',        'price'=>149, 'image_key'=>'smoothie'],
            // চাইলে পরেরগুলোও আনকমেন্ট করতে পারো:
            // ['name'=>'Rice Bowl','description'=>'Hearty bowl',            'price'=>179, 'image_key'=>'rice1'],
            // ['name'=>'Cold Drink','description'=>'Chilled',               'price'=> 49, 'image_key'=>'drink1'],
        ];

        foreach ($seed as $row) {
            MenuItem::firstOrCreate(['name' => $row['name']], $row);
        }
    }
}
