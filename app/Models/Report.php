<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $fillable = [
        'canteen_id', 'report_date', 'total_income', 'total_orders', 'notes'
    ];
    public function canteen() { return $this->belongsTo(Canteen::class); }
}
