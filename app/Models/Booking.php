<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
   
    
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;
    protected $fillable = [
        'status',
        'is_paid',
        'has_breakfast',
        'total_price',
        'num_guests',
    'num_nights',
        // any other fields you want to mass-assign
    ];

    protected $casts = [
    'num_guests' => 'integer',
    'num_nights' => 'integer',
    'total_price' => 'float',
    'is_paid' => 'boolean',
    'has_breakfast' => 'boolean',
];

    protected $attributes = [
        'has_breakfast' => false,
    ];

    public function cabin()
    {
        return $this->belongsTo(Cabin::class);
    }

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function calculateBreakfastCost(): float
    {
        $settings = Setting::first();
        $breakfastPrice = $settings->breakfast_price ?? 0;

        return $breakfastPrice * $this->num_guests * $this->num_nights;
    }
}
