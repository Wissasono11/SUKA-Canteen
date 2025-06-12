<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, string ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $user = Auth::user();
                // Hanya redirect jika user sudah verified dan approved (jika perlu)
                if ($request->routeIs('login') || $request->routeIs('register')) {
                    // JANGAN redirect, biarkan user tetap di halaman login/register jika sudah login
                    // return redirect()->route('user.menu');
                    // return redirect()->route('canteen.dashboard');
                    // return redirect('/');
                }
            }
        }

        return $next($request);
    }
}