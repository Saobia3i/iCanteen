<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeminiProxyController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'messages' => 'nullable|array',     // optional history: [{role, parts:[{text}]}]
            'prompt'   => 'required_without:messages|string', // the user's latest message
            'system'   => 'nullable|string',    // optional system hint
            'model'    => 'nullable|string',    // e.g. gemini-3.5-flash
        ]);

        $apiKey = config('services.gemini.key');
        if (!$apiKey) {
            return response()->json(['message' => 'GEMINI_API_KEY missing on server'], 500);
        }

        $model = $validated['model'] ?? config('services.gemini.model', 'gemini-3.5-flash');

        // Build contents
        $contents = [];
        if (!empty($validated['system'])) {
            $contents[] = [
                'role'  => 'user',
                'parts' => [['text' => "System instruction: ".$validated['system']]],
            ];
        }
        if (!empty($validated['messages'])) {
            // Expecting array like: [{role:"user"|"model", parts:[{text}]}]
            $contents = array_merge($contents, $validated['messages']);
        }
        if (!empty($validated['prompt'])) {
            $contents[] = [
                'role'  => 'user',
                'parts' => [['text' => $validated['prompt']]],
            ];
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";

        $resp = Http::post($url, [
            'contents' => $contents,
        ]);

        if (!$resp->ok()) {
            return response()->json([
                'message' => 'Gemini error',
                'details' => $resp->json()
            ], $resp->status());
        }

        $data = $resp->json();
        $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

        return response()->json([
            'reply' => $reply,
            'raw'   => $data,
        ]);
    }
}
