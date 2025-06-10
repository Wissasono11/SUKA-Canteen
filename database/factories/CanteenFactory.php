<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Canteen>
 */
class CanteenFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Canteen',
            'location' => $this->faker->address,
            'description' => $this->faker->sentence(8),
            'user_id' => 1, // Default, can be overridden
        ];
    }
}
