<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\MenuItem;
use App\Models\Canteen;

class MenuController extends Controller
{
    public function index()
    {
        $menus = MenuItem::with(['canteen', 'category'])
            ->where('is_available', true)
            ->get()
            ->map(function($item) {
                $item->price = (float) $item->price;
                return $item;
            });
        $canteens = Canteen::all();
        return Inertia::render('User/Menu', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'menus' => $menus,
            'canteens' => $canteens,
        ]);
    }
}
