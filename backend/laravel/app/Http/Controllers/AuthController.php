<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $r) {
        $data = $r->validate([
            'name'     => 'required',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role'     => 'nullable|string', // customer/staff; admin => staff
        ]);

        $role = strtolower($data['role'] ?? 'customer');
        if ($role === 'admin') $role = 'staff';
        if (!in_array($role, ['customer','staff'], true)) $role = 'customer';

        // password auto-hash হবে model casts দিয়ে
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => $data['password'],
            'role'     => $role,
        ]);

        $token = $user->createToken('api')->plainTextToken;
        return response()->json(['user'=>$user,'token'=>$token], 201);
    }

    public function login(Request $r) {
        $cred = $r->validate(['email'=>'required|email','password'=>'required']);
        if (!Auth::attempt($cred)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = User::where('email', $cred['email'])->first();
        if ($user->role === 'admin') { $user->role = 'staff'; $user->save(); }
        $token = $user->createToken('api')->plainTextToken;
        return response()->json(['user'=>$user,'token'=>$token]);
    }

    public function logout(Request $r) {
        $r->user()->currentAccessToken()?->delete();
        return response()->json(['ok'=>true]);
    }
}
