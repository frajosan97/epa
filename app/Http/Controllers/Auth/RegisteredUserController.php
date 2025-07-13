<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'idNumber' => 'required|string|max:20|unique:users,id_number',
            'sirName' => 'required|string|max:255',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dob' => 'required|date|before:-18 years',
            'sex' => 'required|string|in:Male,Female,Other',
            'ethnicity' => 'required|string|max:255',
            'membershipCategory' => 'nullable|array',
            'pwdNumber' => 'nullable|string|max:255|required_if:membershipCategory.*,PWD',
            'resideInKenya' => 'required|string|in:Yes,No',
            'countryOfResidence' => 'required_if:resideInKenya,No|string|max:255|nullable',
            'religion' => 'nullable|string|max:255',
            'county' => 'required|exists:counties,id',
            'constituency' => 'required|exists:constituencies,id',
            'ward' => 'required|exists:wards,id',
            'location' => 'nullable|exists:locations,id',
            'preferredChannel' => 'required|string|in:phone,email',
            'phone' => 'required_if:preferredChannel,phone|string|max:20|unique:users,phone|nullable',
            'phoneOTP' => 'required_if:preferredChannel,phone|size:6|nullable',
            'email' => 'required_if:preferredChannel,email|string|email|max:255|unique:users,email|nullable',
            'emailOTP' => 'required_if:preferredChannel,email|size:6|nullable',
            'privacyAcceptance' => 'required|accepted',
        ]);

        // Create the user with mapped fields
        $user = User::create([
            'id_number' => $validated['idNumber'],
            'sir_name' => $validated['sirName'],
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'dob' => $validated['dob'],
            'sex' => $validated['sex'],
            'ethnicity' => $validated['ethnicity'],
            'membership_categories' => json_encode($validated['membershipCategory'] ?? []),
            'pwd_number' => in_array('PWD', $validated['membershipCategory'] ?? [])
                ? $validated['pwdNumber']
                : null,
            'reside_in_kenya' => $validated['resideInKenya'],
            'country_of_residence' => $validated['countryOfResidence'],
            'religion' => $validated['religion'],
            'county_id' => $validated['county'],
            'constituency_id' => $validated['constituency'],
            'ward_id' => $validated['ward'],
            'location_id' => $validated['location'] ?? null,
            'prefered_channel' => $validated['preferredChannel'],
            'phone' => $validated['phone'],
            'phone_verified_at' => $validated['preferredChannel'] === 'phone' ? now() : null,
            'email' => $validated['email'],
            'email_verified_at' => $validated['preferredChannel'] === 'email' ? now() : null,
            'password' => Hash::make($validated['idNumber']),
            'privacy_acceptance' => $validated['privacyAcceptance'],
            'status' => 'pending',
        ]);

        // event(new Registered($user));

        return response()->json([
            'success' => true,
            'message' => 'Registration successful!',
        ]);
    }
}
