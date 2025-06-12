<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canteen extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'name', 'description', 'address', 'phone', 'opening_time', 'closing_time', 'operational_days', 'rating'
    ];
    protected $casts = [
        'operational_days' => 'array',
    ];
}
