<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

class ContactController extends Controller
{
    public function send(Request $r)
    {
        $data = $r->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        // Always send to fixed email
        $to = 'icanteen25@gmail.com';

        Mail::to($to)->send(new ContactMessage(
            $data['name'],
            $data['email'],
            $data['subject'] ?? 'New contact message',
            $data['message']
        ));

        return response()->json(['ok' => true, 'message' => 'Message sent']);
    }
}
