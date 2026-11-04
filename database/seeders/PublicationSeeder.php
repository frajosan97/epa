<?php

namespace Database\Seeders;

use App\Models\Publication;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
{
    public function run(): void
    {
        $publications = [
            [
                'type' => 'public-notice',
                'reference_no' => 'EPA/PN/2026/001',
                'title' => 'PUBLIC NOTICE',
                'subtitle' => 'OPENING OF EPA COUNTY OFFICES IN 24 COUNTIES',
                'organization' => 'Economic Patriotic Alliance (EPA)',
                'summary' => 'EPA has successfully established and operationalized offices in 24 counties across Kenya, with plans underway to cover all 47 counties.',
                'body' => <<<'HTML'
<p>The Economic Patriotic Alliance (EPA) is pleased to inform the general public, members, supporters, stakeholders, and well-wishers that the party has successfully established and operationalized offices in <strong>24 counties across Kenya</strong>.</p>

<p>This significant milestone reflects EPA's commitment to strengthening grassroots engagement, promoting inclusive leadership, and bringing the party closer to the people. The county offices will serve as important centers for party activities, membership registration, civic engagement, policy dissemination, and coordination of development-focused initiatives.</p>

<p>EPA further wishes to announce that plans are underway to establish offices in the remaining counties to ensure nationwide presence and accessibility. The party remains committed to building strong structures in all <strong>47 counties</strong>, thereby enhancing participation and representation of wananchi in the political process.</p>

<p>We encourage all Kenyans who share our vision of economic transformation, patriotism, accountability, and inclusive governance to visit their nearest EPA office and become part of this growing movement.</p>

<p>Together, we are building a stronger, more prosperous, and united Kenya.</p>
HTML,
                'issued_by' => 'Economic Patriotic Alliance (EPA)',
                'signatory_name' => 'David M. Sunduah',
                'signatory_title' => 'Secretary General, Economic Patriotic Alliance (EPA)',
                'tagline' => 'A Strong Economy, A United People, A Prosperous Nation.',
                'location' => null,
                'image' => null,
                'file_path' => null,
                'published_at' => '2026-11-04 09:00:00',
                'is_published' => true,
            ],
        ];

        foreach ($publications as $item) {
            Publication::updateOrCreate(
                ['reference_no' => $item['reference_no']],
                $item
            );
        }
    }
}