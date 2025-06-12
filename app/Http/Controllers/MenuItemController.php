<?php
namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Canteen;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MenuItemController extends Controller
{
    public function index() {
        return response()->json(MenuItem::with(['canteen', 'category'])->get());
    }
    public function show($id) {
        return response()->json(MenuItem::with(['canteen', 'category'])->findOrFail($id));
    }
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'nama_kantin' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);
        $canteen = Canteen::where('name', $validated['nama_kantin'])->where('user_id', $validated['user_id'])->first();
        if (!$canteen) {
            return response()->json(['error' => 'Kantin tidak ditemukan'], 404);
        }
        $category = Category::firstOrCreate(['name' => $validated['category']]);
        $data = [
            'canteen_id' => $canteen->id,
            'category_id' => $category->id,
            'name' => $validated['name'],
            'price' => $validated['price'],
            'is_available' => true,
        ];
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'menu_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/menu', $filename);
            $data['image_url'] = '/storage/menu/' . $filename;
        }
        $menu = MenuItem::create($data);
        return response()->json($menu, 201);
    }
    public function update(Request $request, $id) {
        $menu = MenuItem::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'nama_kantin' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);
        $canteen = Canteen::where('name', $validated['nama_kantin'])->where('user_id', $validated['user_id'])->first();
        if (!$canteen) {
            return response()->json(['error' => 'Kantin tidak ditemukan'], 404);
        }
        $category = Category::firstOrCreate(['name' => $validated['category']]);
        $menu->name = $validated['name'];
        $menu->price = $validated['price'];
        $menu->category_id = $category->id;
        $menu->canteen_id = $canteen->id;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'menu_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/menu', $filename);
            $menu->image_url = '/storage/menu/' . $filename;
        }
        $menu->save();
        return response()->json($menu);
    }
    public function destroy($id) {
        $menu = MenuItem::findOrFail($id);
        $menu->delete();
        return response()->json(null, 204);
    }
}
