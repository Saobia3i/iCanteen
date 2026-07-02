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
            'model'    => 'nullable|string',    // e.g. gemini-2.5-flash
        ]);

        $apiKey = config('services.gemini.key');
        if (!$apiKey) {
            return response()->json(['message' => 'GEMINI_API_KEY missing on server'], 500);
        }

        $model = $validated['model'] ?? config('services.gemini.model', 'gemini-2.5-flash');

        // Build contents
        $contents = [];
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

        $payload = [
            'contents' => $contents,
        ];

        if (!empty($validated['system'])) {
            $payload['systemInstruction'] = [
                'parts' => [['text' => $validated['system']]],
            ];
        }

        $models = array_values(array_unique(array_filter(array_merge(
            [$model],
            config('services.gemini.fallback_models', [])
        ))));

        $resp = null;
        foreach ($models as $candidateModel) {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$candidateModel}:generateContent?key={$apiKey}";
            $resp = Http::post($url, $payload);

            if ($resp->ok() || !in_array($resp->status(), [404, 429, 503], true)) {
                break;
            }
        }

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
