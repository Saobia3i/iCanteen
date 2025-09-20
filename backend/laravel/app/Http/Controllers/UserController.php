<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $r) {
        return $r->user(); // name, email, role
    }

    public function update(Request $r) {
        $user = $r->user();
        $data = $r->validate([
            'name'     => 'sometimes|required|string|max:255',
            'password' => 'sometimes|required|min:6',
        ]);

        if (isset($data['name']))     $user->name = $data['name'];
        if (isset($data['password'])) $user->password = $data['password']; // auto-hash (casts)
        $user->save();

        return response()->json($user);
    }
}
