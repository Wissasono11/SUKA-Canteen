<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Menu;
use App\Models\Canteen;

class MenuController extends Controller
{
    public function index()
    {
        // Ambil semua menu terbaru beserta data kantin
        $menus = Menu::with('canteen')->latest()->get();
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
