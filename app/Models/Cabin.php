<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabin extends Model
{
    /** @use HasFactory<\Database\Factories\CabinFactory> */
    use HasFactory;
    protected $fillable = ['name', 'maxCapacity' , 'regularPrice', 'discount', 'description', 'image'];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
