<?php

use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Exceptions;
use App\Http\Middleware\SimpleCors; // <-- এই লাইনটা উপরে add করো
use App\Http\Middleware\RoleMiddleware;
return Illuminate\Foundation\Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
     ->withMiddleware(function (Middleware $middleware) {
        // GLOBAL
        $middleware->append(SimpleCors::class);

        // Route middleware bindings
        $middleware->alias([
            'role' => RoleMiddleware::class,   // <-- Add this
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();