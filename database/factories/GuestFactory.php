<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guest>
 */
class GuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fullName' => fake()->name(),
            'email' => fake()->email(),
            'nationalID' => fake()->randomElement(['240-228340-X-22', '223-425631-Y-15', '250-185420-B-25']),
            'nationality' => fake()->country(),
            'countryFlag' => fake()->countryCode()
        ];
    }
}
