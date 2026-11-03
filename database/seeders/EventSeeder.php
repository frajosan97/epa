<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'National Youth Mobilization Rally',
                'subtitle' => 'Empowering the Next Generation',
                'event_date' => '2025-07-10',
                'event_time' => '10:00 AM',
                'location' => 'Uhuru Park, Nairobi',
                'image' => '3.jpg',
            ],
            [
                'title' => 'Western Region Economic Forum',
                'subtitle' => 'Driving Regional Development',
                'event_date' => '2025-07-22',
                'event_time' => '8:00 AM',
                'location' => 'Kakamega Golf Hotel Grounds',
                'image' => '5.jpg',
            ],
            [
                'title' => 'Women Leadership Summit',
                'subtitle' => 'Breaking Barriers, Building Futures',
                'event_date' => '2025-08-05',
                'event_time' => '9:00 AM',
                'location' => 'Mombasa Showground',
                'image' => '1.jpg',
            ],
        ];

        foreach ($events as $event) {
            Event::firstOrCreate(['title' => $event['title']], $event);
        }
    }
}