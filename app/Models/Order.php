<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'canteen_id', 'customer_id', 'order_number', 'total_amount', 'status', 'payment_method', 'payment_status'
    ];
    public function items() { return $this->hasMany(OrderItem::class); }
    public function canteen() { return $this->belongsTo(Canteen::class); }
    public function customer() { return $this->belongsTo(User::class, 'customer_id'); }
}
