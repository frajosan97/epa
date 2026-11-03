<?php

namespace Database\Seeders;

use App\Models\Download;
use Illuminate\Database\Seeder;

class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        $downloads = [
            [
                'title' => 'Form 1: Code of Conduct',
                'description' => 'Code of Conduct form for party members',
                'category' => 'Forms',
                'version' => '1.0',
                'file_size' => '0.5 MB',
                'file_type' => 'pdf',
                'file_path' => 'documents/downloads/form-1.pdf',
                'is_featured' => false,
                'tags' => ['form', 'conduct'],
                'published_at' => '2023-01-01 00:00:00',
                'is_published' => true,
            ],
            [
                'title' => "Form 2: Subscription to the Party's Constitution, Elections and Nomination Rules and Code of Conduct",
                'description' => 'Subscription form for party documents',
                'category' => 'Forms',
                'version' => '1.0',
                'file_size' => '0.6 MB',
                'file_type' => 'pdf',
                'file_path' => 'documents/downloads/form-2.pdf',
                'is_featured' => false,
                'tags' => ['form', 'subscription'],
                'published_at' => '2023-01-01 00:00:00',
                'is_published' => true,
            ],
            [
                'title' => 'Form 6: Application Form for Nomination as a Party Candidate',
                'description' => 'Application form for party candidate nomination',
                'category' => 'Forms',
                'version' => '1.0',
                'file_size' => '0.7 MB',
                'file_type' => 'pdf',
                'file_path' => 'documents/downloads/form-6.pdf',
                'is_featured' => false,
                'tags' => ['form', 'candidate'],
                'published_at' => '2023-01-01 00:00:00',
                'is_published' => true,
            ],
        ];

        foreach ($downloads as $item) {
            Download::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}