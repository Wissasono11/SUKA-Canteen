<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['madang', 'sarapan', 'snack', 'minuman'];
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(10),
            'price' => $this->faker->numberBetween(8000, 25000),
            'category' => $this->faker->randomElement($categories),
            'rating' => $this->faker->randomFloat(1, 3, 5),
            'image' => null,
            'canteen_id' => 1, // Default, can be overridden
        ];
    }
}
