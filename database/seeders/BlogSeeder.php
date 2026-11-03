<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            [
                'title' => 'Membership Recruitment Plan and Website Demonstration at ORPP',
                'subtitle' => 'EPA demonstrates compliance with political party regulations',
                'published_at' => '2025-07-01 10:00:00',
                'location' => '1st Floor Boardroom, ORPP',
                'image' => '21.jpeg',
                'description' => 'The Economic Patriotic Alliance (EPA) successfully participated in the membership recruitment system demonstration organized by the Office of the Registrar of Political Parties (ORPP). The team demonstrated full compliance with political party regulations, showcasing digital membership registration, member details management, and secure authentication processes.',
            ],
            [
                'title' => 'Party Manifesto and Ideology Presentation',
                'subtitle' => 'Official unveiling of EPA\'s vision and goals',
                'published_at' => '2025-05-28 09:00:00', // original time not specified
                'location' => 'Party Registrar\'s Office',
                'image' => '24.jpeg',
                'description' => 'The party\'s manifesto and ideology were officially presented at the party registrar\'s office with many key party officials in attendance. This significant event marked a pivotal moment for the party as they outlined their vision and goals for the future.',
            ],
            [
                'title' => 'National Youth Mobilization Rally',
                'subtitle' => 'Empowering the Next Generation',
                'published_at' => '2025-07-10 10:00:00',
                'location' => 'Uhuru Park, Nairobi',
                'image' => '13.jpg',
                'description' => 'Join us for an inspiring rally focused on engaging and empowering the youth in our national development agenda.',
            ],
            [
                'title' => 'Western Region Economic Forum',
                'subtitle' => 'Driving Regional Development',
                'published_at' => '2025-07-22 08:00:00',
                'location' => 'Kakamega Golf Hotel Grounds',
                'image' => '25.jpeg',
                'description' => 'A forum to discuss economic development strategies and opportunities in the Western region.',
            ],
            [
                'title' => 'Women Leadership Summit',
                'subtitle' => 'Breaking Barriers, Building Futures',
                'published_at' => '2025-08-05 09:00:00',
                'location' => 'Mombasa Showground',
                'image' => '18.jpeg',
                'description' => 'A summit dedicated to promoting women leadership and addressing gender equality in leadership roles.',
            ],
        ];

        foreach ($news as $item) {
            Blog::updateOrCreate(
                ['title' => $item['title']],
                array_merge($item, ['is_published' => true])
            );
        }
    }
}