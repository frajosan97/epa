<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function appeal()
    {
        return Inertia::render('Frontend/Donation/Appeal');
    }

    public function financial()
    {
        return Inertia::render('Frontend/Donation/Financial');
    }

    public function office()
    {
        return Inertia::render('Frontend/Donation/Office');
    }

    public function specialized()
    {
        return Inertia::render('Frontend/Donation/Specialized');
    }
}
