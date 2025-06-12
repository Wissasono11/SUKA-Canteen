<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\MenuItem;
use App\Models\Canteen;
use App\Models\Category;

class MenuController extends Controller
{
    public function index()
    {
        $menus = MenuItem::with(['category'])
            ->where('is_available', true)
            ->get()
            ->map(function($item) {
                $item->price = (float) $item->price;
                return $item;
            });
        $categories = Category::all();
        $canteens = Canteen::all();
        return Inertia::render('User/Menu', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'menus' => $menus,
            'categories' => $categories,
            'canteens' => $canteens,
        ]);
    }
}
