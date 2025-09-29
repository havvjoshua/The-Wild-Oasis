<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Setting>
 */
class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'minBookingLength' => fake()->numberBetween(1, 10),
            'maxBookingLength' => fake()->numberBetween(20, 30),
            'maxGuestsPerBooking' => fake()->numberBetween(1, 20),
            'breakfastPrice' => fake()->randomFloat(2, 20, 30),
        ];
    }
}
