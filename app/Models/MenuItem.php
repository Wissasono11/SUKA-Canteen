<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id', 'name', 'description', 'price', 'stock', 'is_available', 'image_url'
    ];
    public function category() { return $this->belongsTo(Category::class); }
}
