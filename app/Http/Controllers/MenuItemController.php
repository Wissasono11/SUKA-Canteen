<?php
namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MenuItemController extends Controller
{
    public function index() {
        return response()->json(MenuItem::with(['category'])->get());
    }
    public function show($id) {
        return response()->json(MenuItem::with(['category'])->findOrFail($id));
    }
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
        $category = Category::firstOrCreate(['name' => $validated['category']]);
        $data = [
            'category_id' => $category->id,
            'name' => $validated['name'],
            'price' => $validated['price'],
            'is_available' => true,
        ];
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'menu_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            // Simpan ke storage/app/public/menu
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
        ]);
        $category = Category::firstOrCreate(['name' => $validated['category']]);
        $menu->name = $validated['name'];
        $menu->price = $validated['price'];
        $menu->category_id = $category->id;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'menu_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            // Simpan ke storage/app/public/menu
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
