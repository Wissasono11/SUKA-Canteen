<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id', 'order_number', 'total_amount', 'order_type', 'customer_name', 'note', 'status', 'payment_method', 'payment_status'
    ];
    public function items() { return $this->hasMany(OrderItem::class); }
    public function customer() { return $this->belongsTo(User::class, 'customer_id'); }
}
