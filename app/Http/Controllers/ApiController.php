<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Models\County;
use App\Models\Constituency;
use App\Models\User;
use App\Models\Ward;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    /**
     * SMS Service instance for sending notifications
     * 
     * @var SmsService
     */
    protected $smsService;

    /**
     * Constructor for dependency injection
     *
     * @param SmsService $smsService
     */
    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    public function countries()
    {
        try {
            $countries = [
                "Afghanistan",
                "Albania",
                "Algeria",
                "Andorra",
                "Angola",
                "Antigua and Barbuda",
                "Argentina",
                "Armenia",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bhutan",
                "Bolivia",
                "Bosnia and Herzegovina",
                "Botswana",
                "Brazil",
                "Brunei",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cabo Verde",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Central African Republic",
                "Chad",
                "Chile",
                "China",
                "Colombia",
                "Comoros",
                "Congo (Brazzaville)",
                "Congo (Kinshasa)",
                "Costa Rica",
                "Croatia",
                "Cuba",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Eswatini",
                "Ethiopia",
                "Fiji",
                "Finland",
                "France",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Greece",
                "Grenada",
                "Guatemala",
                "Guinea",
                "Guinea-Bissau",
                "Guyana",
                "Haiti",
                "Honduras",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran",
                "Iraq",
                "Ireland",
                "Israel",
                "Italy",
                "Jamaica",
                "Japan",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "Kuwait",
                "Kyrgyzstan",
                "Laos",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Marshall Islands",
                "Mauritania",
                "Mauritius",
                "Mexico",
                "Micronesia",
                "Moldova",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Morocco",
                "Mozambique",
                "Myanmar (Burma)",
                "Namibia",
                "Nauru",
                "Nepal",
                "Netherlands",
                "New Zealand",
                "Nicaragua",
                "Niger",
                "Nigeria",
                "North Korea",
                "North Macedonia",
                "Norway",
                "Oman",
                "Pakistan",
                "Palau",
                "Palestine",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Russia",
                "Rwanda",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Korea",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan",
                "Suriname",
                "Sweden",
                "Switzerland",
                "Syria",
                "Taiwan",
                "Tajikistan",
                "Tanzania",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Tuvalu",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "United States",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Vatican City",
                "Venezuela",
                "Vietnam",
                "Yemen",
                "Zambia",
                "Zimbabwe",
            ];

            return response()->json($countries);
        } catch (\Exception $e) {
            Log::error('Countries failed: ' . $e->getMessage());
            return response()->json('Countries failed: ' . $e->getMessage());
        }
    }

    public function counties()
    {
        try {
            $counties = County::all();

            return response()->json($counties);
        } catch (\Exception $e) {
            Log::error('Counties failed: ' . $e->getMessage());
            return response()->json('Counties failed: ' . $e->getMessage());
        }
    }

    public function constituencies(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'county' => 'required|string|exists:counties,id',
            ]);

            $constituencies = Constituency::where('county_id', $request->county)->get();

            return response()->json($constituencies);
        } catch (\Exception $e) {
            Log::error('Constituencies failed: ' . $e->getMessage());
            return response()->json('Constituencies failed: ' . $e->getMessage());
        }
    }

    public function wards(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'constituency' => 'required|string|exists:constituencies,id',
            ]);

            $wards = Ward::where('constituency_id', $request->constituency)->get();

            return response()->json($wards);
        } catch (\Exception $e) {
            Log::error('Wards failed: ' . $e->getMessage());
            return response()->json('Wards failed: ' . $e->getMessage());
        }
    }

    public function events()
    {
        try {
            $events = [
                [
                    'id' => 1,
                    'title' => 'National Youth Mobilization Rally',
                    'subtitle' => 'Empowering the Next Generation',
                    'date' => 'July 10, 2025',
                    'time' => '10:00 AM',
                    'location' => 'Uhuru Park, Nairobi',
                    'image' => '3.jpeg',
                ],
                [
                    'id' => 2,
                    'title' => 'Western Region Economic Forum',
                    'subtitle' => 'Driving Regional Development',
                    'date' => 'July 22, 2025',
                    'time' => '8:00 AM',
                    'location' => 'Kakamega Golf Hotel Grounds',
                    'image' => '5.jpeg',
                ],
                [
                    'id' => 3,
                    'title' => 'Women Leadership Summit',
                    'subtitle' => 'Breaking Barriers, Building Futures',
                    'date' => 'August 5, 2025',
                    'time' => '9:00 AM',
                    'location' => 'Mombasa Showground',
                    'image' => '1.jpeg',
                ],
            ];

            return response()->json($events);
        } catch (\Exception $e) {
            Log::error('Events failed: ' . $e->getMessage());
            return response()->json('Events failed: ' . $e->getMessage());
        }
    }

    public function news()
    {
        try {
            $news = [
                [
                    'id' => 1,
                    'title' => 'Membership Recruitment Plan and Website Demonstration at ORPP',
                    'subtitle' => 'EPA demonstrates compliance with political party regulations',
                    'date' => 'July 1, 2025',
                    'time' => '10:00 AM',
                    'location' => '1st Floor Boardroom, ORPP',
                    'image' => '21.jpeg',
                    'description' => 'The Economic Patriotic Alliance (EPA) successfully participated in the membership recruitment system demonstration organized by the Office of the Registrar of Political Parties (ORPP). The team demonstrated full compliance with political party regulations, showcasing digital membership registration, member details management, and secure authentication processes.'
                ],
                [
                    'id' => 2,
                    'title' => 'Party Manifesto and Ideology Presentation',
                    'subtitle' => 'Official unveiling of EPA\'s vision and goals',
                    'date' => 'May 28, 2025',
                    'time' => 'Time not specified',
                    'location' => 'Party Registrar\'s Office',
                    'image' => '24.jpeg',
                    'description' => 'The party\'s manifesto and ideology were officially presented at the party registrar\'s office with many key party officials in attendance. This significant event marked a pivotal moment for the party as they outlined their vision and goals for the future.'
                ],
                [
                    'id' => 3,
                    'title' => 'National Youth Mobilization Rally',
                    'subtitle' => 'Empowering the Next Generation',
                    'date' => 'July 10, 2025',
                    'time' => '10:00 AM',
                    'location' => 'Uhuru Park, Nairobi',
                    'image' => '17.jpeg',
                    'description' => 'Join us for an inspiring rally focused on engaging and empowering the youth in our national development agenda.'
                ],
                [
                    'id' => 4,
                    'title' => 'Western Region Economic Forum',
                    'subtitle' => 'Driving Regional Development',
                    'date' => 'July 22, 2025',
                    'time' => '8:00 AM',
                    'location' => 'Kakamega Golf Hotel Grounds',
                    'image' => '25.jpeg',
                    'description' => 'A forum to discuss economic development strategies and opportunities in the Western region.'
                ],
                [
                    'id' => 5,
                    'title' => 'Women Leadership Summit',
                    'subtitle' => 'Breaking Barriers, Building Futures',
                    'date' => 'August 5, 2025',
                    'time' => '9:00 AM',
                    'location' => 'Mombasa Showground',
                    'image' => '18.jpeg',
                    'description' => 'A summit dedicated to promoting women leadership and addressing gender equality in leadership roles.'
                ]
            ];

            return response()->json($news);
        } catch (\Exception $e) {
            Log::error('News failed: ' . $e->getMessage());
            return response()->json('News failed: ' . $e->getMessage());
        }
    }

    public function gallerly()
    {
        try {
            $gallerly = [
                // Political Rallies
                [
                    'id' => 1,
                    'category' => 'political-rallies',
                    'title' => 'National Convention 2023',
                    'image' => '1.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 2,
                    'category' => 'political-rallies',
                    'title' => 'Youth Empowerment Rally',
                    'image' => '2.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 3,
                    'category' => 'political-rallies',
                    'title' => 'Women Leadership Rally',
                    'image' => '3.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 4,
                    'category' => 'political-rallies',
                    'title' => 'Regional Political Gathering',
                    'image' => '4.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 5,
                    'category' => 'political-rallies',
                    'title' => 'Policy Announcement Rally',
                    'image' => '5.jpeg',
                    'description' => ''
                ],
                // [
                //     'id' => 6,
                //     'category' => 'political-rallies',
                //     'title' => 'Election Campaign Kickoff',
                //     'image' => '6.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 7,
                //     'category' => 'community-meetings',
                //     'title' => 'Town Hall Discussion',
                //     'image' => '7.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 8,
                //     'category' => 'community-meetings',
                //     'title' => 'Village Development Forum',
                //     'image' => '8.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 9,
                //     'category' => 'community-meetings',
                //     'title' => 'Youth Engagement Session',
                //     'image' => '9.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 10,
                //     'category' => 'community-meetings',
                //     'title' => 'Elderly Community Dialogue',
                //     'image' => '10.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 11,
                //     'category' => 'community-meetings',
                //     'title' => 'Women\'s Group Gathering',
                //     'image' => '11.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 12,
                //     'category' => 'community-meetings',
                //     'title' => 'Local Business Forum',
                //     'image' => '12.jpeg',
                //     'description' => ''
                // ],

                // // Celebrations
                // [
                //     'id' => 13,
                //     'category' => 'celebrations',
                //     'title' => '5th Anniversary Gala',
                //     'image' => '13.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 14,
                //     'category' => 'celebrations',
                //     'title' => 'Independence Day Celebration',
                //     'image' => '14.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 15,
                //     'category' => 'celebrations',
                //     'title' => 'Cultural Festival',
                //     'image' => '15.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 16,
                //     'category' => 'celebrations',
                //     'title' => 'Achievement Awards Night',
                //     'image' => '16.jpeg',
                //     'description' => ''
                // ],
                // [
                //     'id' => 17,
                //     'category' => 'celebrations',
                //     'title' => 'Founders Day Celebration',
                //     'image' => '17.jpeg',
                //     'description' => ''
                // ],
                [
                    'id' => 18,
                    'category' => 'celebrations',
                    'title' => 'Community Harvest Festival',
                    'image' => '18.jpeg',
                    'description' => ''
                ],

                // Campaign Trails
                [
                    'id' => 19,
                    'category' => 'campaign-trails',
                    'title' => 'Door-to-Door Canvassing',
                    'image' => '19.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 20,
                    'category' => 'campaign-trails',
                    'title' => 'Marketplace Engagement',
                    'image' => '35.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 21,
                    'category' => 'campaign-trails',
                    'title' => 'Rural Village Tour',
                    'image' => '21.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 22,
                    'category' => 'campaign-trails',
                    'title' => 'Urban Neighborhood Walk',
                    'image' => '22.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 23,
                    'category' => 'campaign-trails',
                    'title' => 'Youth Voter Registration Drive',
                    'image' => '23.jpeg',
                    'description' => ''
                ],
                [
                    'id' => 24,
                    'category' => 'campaign-trails',
                    'title' => 'Policy Roadshow',
                    'image' => '24.jpeg',
                    'description' => ''
                ]
            ];

            return response()->json($gallerly);
        } catch (\Exception $e) {
            Log::error('Gallery failed: ' . $e->getMessage());
            return response()->json(['error' => 'Gallery failed: ' . $e->getMessage()], 500);
        }
    }

    public function send(Request $request)
    {
        try {
            $validated = $request->validate([
                'type'  => ['required', 'string', 'in:phone,email', 'max:255'],
                'email' => ['required_if:type,email', 'email', 'max:255'],
                'phone' => ['required_if:type,phone', 'string', 'max:20'],
            ]);

            $otp = generateOtp();
            $identifier = $validated['type'] === 'phone'
                ? formatPhoneNumber($validated['phone'])
                : $validated['email'];

            // Store OTP in cache for 5 minutes (300 seconds)
            Cache::put('otp_' . $identifier, $otp, now()->addMinutes(5));

            $message = 'Your EPA verification OTP is ' . $otp;

            if ($validated['type'] === 'phone') {
                $this->smsService->sendSms($identifier, $message);
            } else {
                // Implement email sending logic here
                Mail::to($identifier)->send(new OtpMail($otp));
            }

            return response()->json([
                'success' => true,
                'message' => 'OTP sent successfully',
                'expires_in' => 300 // seconds
            ]);
        } catch (\Exception $e) {
            Log::error('OTP send failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to send OTP',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verify(Request $request)
    {
        try {
            $validated = $request->validate([
                'type'  => ['required', 'string', 'in:phone,email', 'max:255'],
                'email' => ['required_if:type,email', 'email', 'max:255'],
                'phone' => ['required_if:type,phone', 'string', 'max:20'],
                'otp'   => ['required', 'string', 'digits:6'],
            ]);

            $identifier = $validated['type'] === 'phone'
                ? formatPhoneNumber($validated['phone'])
                : $validated['email'];

            $cachedOtp = Cache::get('otp_' . $identifier);

            if (!$cachedOtp) {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP expired or not found'
                ], 400);
            }

            if ($cachedOtp != $validated['otp']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid OTP'
                ], 400);
            }

            // OTP is valid, clear it from cache
            Cache::forget('otp_' . $identifier);

            return response()->json([
                'success' => true,
                'message' => 'OTP verified successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('OTP verification failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'OTP verification failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function confirm(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:id,phone',
            'value' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $type = $request->input('type');
            $value = $request->input('value');

            // Search for user based on type
            if ($type === 'id') {
                $user = User::where('id_number', $value)->first();
            } else {
                $user = User::where('phone', $value)->first();
            }

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'No member found with those details'
                ], 404);
            }

            // Return member information (only necessary fields)
            return response()->json([
                'success' => true,
                'message' => 'Member found',
                'member' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function unsubscribe(Request $request)
    {
        try {
            $request->validate([
                'member_id' => 'required|integer|exists:users,id',
                'otp' => 'required|string|size:6',
                'verification_channel' => 'required|in:email,phone'
            ]);

            // Find the user
            $user = User::findOrFail($request->member_id);

            // Update user status
            $user->status = 'unsubscribed';
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'You have been successfully unsubscribed'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
