<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function downloads()
    {
        $downloads = [
            [
                'id' => 1,
                'title' => 'CONSTITUTION',
                'description' => 'Party constitution document',
                'category' => 'Party Documents',
                'version' => '1.0',
                'fileSize' => '2.5 MB',
                'downloads' => 0,
                'date' => '2023-01-01',
                'fileType' => 'pdf',
                'url' => 'constitution.pdf',
                'featured' => true,
                'tags' => ['constitution', 'rules']
            ],
            [
                'id' => 2,
                'title' => 'ELECTION AND NOMINATION RULES',
                'description' => 'Rules governing party elections and nominations',
                'category' => 'Party Documents',
                'version' => '1.0',
                'fileSize' => '1.8 MB',
                'downloads' => 0,
                'date' => '2023-01-01',
                'fileType' => 'pdf',
                'url' => 'election-rules.pdf',
                'featured' => true,
                'tags' => ['elections', 'nominations']
            ],
            // [
            //     'id' => 3,
            //     'title' => 'MANIFESTO',
            //     'description' => 'Party manifesto document',
            //     'category' => 'Party Documents',
            //     'version' => '1.0',
            //     'fileSize' => '3.2 MB',
            //     'downloads' => 0,
            //     'date' => '2023-01-01',
            //     'fileType' => 'pdf',
            //     'featured' => true,
            //     'tags' => ['manifesto', 'policies']
            // ],
            // [
            //     'id' => 4,
            //     'title' => 'IDEOLOGY',
            //     'description' => 'Party ideology document',
            //     'category' => 'Party Documents',
            //     'version' => '1.0',
            //     'fileSize' => '1.5 MB',
            //     'downloads' => 0,
            //     'date' => '2023-01-01',
            //     'fileType' => 'pdf',
            //     'featured' => false,
            //     'tags' => ['ideology', 'principles']
            // ],
            [
                'id' => 5,
                'title' => 'Form 1: Code of Conduct',
                'description' => 'Code of Conduct form for party members',
                'category' => 'Forms',
                'version' => '1.0',
                'fileSize' => '0.5 MB',
                'downloads' => 0,
                'date' => '2023-01-01',
                'fileType' => 'pdf',
                'url' => 'form-1.pdf',
                'featured' => false,
                'tags' => ['form', 'conduct']
            ],
            [
                'id' => 6,
                'title' => 'Form 2: Subscription to the Party\'s Constitution, Elections and Nomination Rules and Code of Conduct',
                'description' => 'Subscription form for party documents',
                'category' => 'Forms',
                'version' => '1.0',
                'fileSize' => '0.6 MB',
                'downloads' => 0,
                'date' => '2023-01-01',
                'fileType' => 'pdf',
                'url' => 'form-2.pdf',
                'featured' => false,
                'tags' => ['form', 'subscription']
            ],
            // [
            //     'id' => 7,
            //     'title' => 'Form 5: Application Form for Nomination as the Party\'s Presidential Candidate',
            //     'description' => 'Application form for presidential candidate nomination',
            //     'category' => 'Forms',
            //     'version' => '1.0',
            //     'fileSize' => '0.7 MB',
            //     'downloads' => 0,
            //     'date' => '2023-01-01',
            //     'fileType' => 'pdf',
            //     'featured' => false,
            //     'tags' => ['form', 'presidential']
            // ],
            [
                'id' => 8,
                'title' => 'Form 6: Application Form for Nomination as a Party Candidate',
                'description' => 'Application form for party candidate nomination',
                'category' => 'Forms',
                'version' => '1.0',
                'fileSize' => '0.7 MB',
                'downloads' => 0,
                'date' => '2023-01-01',
                'fileType' => 'pdf',
                'url' => 'form-6.pdf',
                'featured' => false,
                'tags' => ['form', 'candidate']
            ],
            // [
            //     'id' => 9,
            //     'title' => 'Form 18A: Application Form for Nomination as a Party List Candidate (National Assembly & Senate)',
            //     'description' => 'Application form for party list candidate nomination (National Assembly & Senate)',
            //     'category' => 'Forms',
            //     'version' => '1.0',
            //     'fileSize' => '0.8 MB',
            //     'downloads' => 0,
            //     'date' => '2023-01-01',
            //     'fileType' => 'pdf',
            //     'featured' => false,
            //     'tags' => ['form', 'national assembly', 'senate']
            // ],
            // [
            //     'id' => 10,
            //     'title' => 'Form 18B: Application Form for Nomination as a Party List Candidate (County Assembly)',
            //     'description' => 'Application form for party list candidate nomination (County Assembly)',
            //     'category' => 'Forms',
            //     'version' => '1.0',
            //     'fileSize' => '0.8 MB',
            //     'downloads' => 0,
            //     'date' => '2023-01-01',
            //     'fileType' => 'pdf',
            //     'featured' => false,
            //     'tags' => ['form', 'county assembly']
            // ]
        ];

        return Inertia::render('Frontend/Resource/Download', [
            'downloadItems' => $downloads
        ]);
    }

    public function privacy()
    {
        return Inertia::render('Frontend/Resource/Privacy');
    }

    public function faq()
    {
        return Inertia::render('Frontend/Resource/faq');
    }
}
