<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $gallery = [
            // political-rallies
            ['category' => 'political-rallies', 'title' => 'National Convention 2023', 'image' => '1.jpg', 'description' => ''],
            ['category' => 'political-rallies', 'title' => 'Youth Empowerment Rally', 'image' => '2.jpg', 'description' => ''],
            ['category' => 'political-rallies', 'title' => 'Women Leadership Rally', 'image' => '3.jpg', 'description' => ''],
            ['category' => 'political-rallies', 'title' => 'Regional Political Gathering', 'image' => '4.jpg', 'description' => ''],
            ['category' => 'political-rallies', 'title' => 'Policy Announcement Rally', 'image' => '5.jpg', 'description' => ''],

            // celebrations
            ['category' => 'celebrations', 'title' => 'Community Harvest Festival', 'image' => '18.jpeg', 'description' => ''],

            // campaign-trails
            ['category' => 'campaign-trails', 'title' => 'Door-to-Door Canvassing', 'image' => '19.jpeg', 'description' => ''],
            ['category' => 'campaign-trails', 'title' => 'Marketplace Engagement', 'image' => '35.jpeg', 'description' => ''],
            ['category' => 'campaign-trails', 'title' => 'Rural Village Tour', 'image' => '21.jpeg', 'description' => ''],
            ['category' => 'campaign-trails', 'title' => 'Urban Neighborhood Walk', 'image' => '22.jpeg', 'description' => ''],
            ['category' => 'campaign-trails', 'title' => 'Youth Voter Registration Drive', 'image' => '23.jpeg', 'description' => ''],
            ['category' => 'campaign-trails', 'title' => 'Policy Roadshow', 'image' => '24.jpeg', 'description' => ''],
        ];

        foreach ($gallery as $item) {
            Gallery::firstOrCreate(
                ['category' => $item['category'], 'title' => $item['title']],
                $item
            );
        }
    }
}