<?php

namespace Database\Factories;

use App\Models\Cabin;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start_date' => fake()->dateTimeBetween('now', '3 days', null),
            'end_date' => fake()->dateTimeBetween('now', '30 days', null),
            'num_nights' => fake()->numberBetween(1, 30),
            'num_guests' => fake()->numberBetween(1, 30),
            'cabin_price' => fake()->randomFloat(2, 200, 500),
            'extras_price' => fake()->randomFloat(2, 20, 500),
            'total_price' => fake()->randomFloat(2, 300, 5000),
            'status' => 'unconfirmed',
            'has_breakfast' => fake()->boolean(),
            'is_paid' => fake()->boolean(),
            'observation' => fake()->sentence(),
            'cabin_id' => Cabin::factory(),
            'guest_id' => Guest::factory()
        ];
    }
}
