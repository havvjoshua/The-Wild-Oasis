<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cabin>
 */
class CabinFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstNameFemale(),
            'maxCapacity' => fake()->numberBetween(1, 10),
            'regularPrice' => fake()->numberBetween(300, 2000),
            'discount' => fake()->numberBetween(20, 200),
            'description' => fake()->sentence(),
            'image' => fake()->imageUrl()
        ];
    }
}
