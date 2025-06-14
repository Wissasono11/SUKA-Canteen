<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || $request->user()->role !== $role) {
            return redirect()->route('unauthorized');
        }

        if ($role === 'canteen_owner' && !$request->user()->is_approved) {
            return redirect()->route('pending-approval');
        }

        return $next($request);
    }
}
