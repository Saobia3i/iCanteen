<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SimpleCors
{
    public function handle(Request $request, Closure $next)
    {
        $origin = $request->headers->get('Origin');

        // তোমার frontend dev origins allow করো:
        $allowedOrigins = array_filter(array_map(
            'trim',
            explode(',', env('FRONTEND_URLS', 'http://localhost:5173,http://127.0.0.1:5173'))
        ));

        $allowOrigin = $origin && in_array($origin, $allowedOrigins, true)
            ? $origin
            : null;

        $headers = [
            'Access-Control-Allow-Methods'     => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
            'Access-Control-Expose-Headers'    => 'Authorization',
            'Access-Control-Allow-Credentials' => 'true',
            'Vary'                              => 'Origin',
        ];

        if ($allowOrigin) {
            $headers['Access-Control-Allow-Origin'] = $allowOrigin;
        }

        // Preflight (OPTIONS) হলে তৎক্ষণাৎ 204 রিটার্ন করো
        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204)->withHeaders($headers);
        }

        $response = $next($request);

        foreach ($headers as $k => $v) {
            $response->headers->set($k, $v);
        }

        return $response;
    }
}
