<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Models\Blog;
use App\Models\Constituency;
use App\Models\Country;
use App\Models\County;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\User;
use App\Models\Ward;
use App\Services\SmsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    /**
     * SMS service used to dispatch OTP and notification messages.
     *
     * @var SmsService
     */
    protected SmsService $smsService;

    /**
     * Inject required services.
     *
     * @param  SmsService  $smsService
     */
    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    /* =====================================================================
     |  REFERENCE / LOOKUP ENDPOINTS
     |===================================================================== */

    /**
     * List all active countries, alphabetically ordered.
     *
     * Used by onboarding / registration forms to populate a country picker.
     *
     * @return JsonResponse
     */
    public function countries(): JsonResponse
    {
        try {
            $countries = Country::where('is_active', true)
                ->orderBy('name')
                ->get();

            return response()->json($countries);
        } catch (\Throwable $e) {
            Log::error('Countries failed: ' . $e->getMessage());

            return response()->json(['error' => 'Countries failed'], 500);
        }
    }

    /**
     * List all counties.
     *
     * @return JsonResponse
     */
    public function counties(): JsonResponse
    {
        try {
            $counties = County::all();

            return response()->json($counties);
        } catch (\Throwable $e) {
            Log::error('Counties failed: ' . $e->getMessage());

            return response()->json(['error' => 'Counties failed'], 500);
        }
    }

    /**
     * List constituencies belonging to a given county.
     *
     * @param  Request  $request  Requires: county (county id)
     * @return JsonResponse
     */
    public function constituencies(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'county' => 'required|string|exists:counties,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $constituencies = Constituency::where('county_id', $request->county)->get();

            return response()->json($constituencies);
        } catch (\Throwable $e) {
            Log::error('Constituencies failed: ' . $e->getMessage());

            return response()->json(['error' => 'Constituencies failed'], 500);
        }
    }

    /**
     * List wards belonging to a given constituency.
     *
     * @param  Request  $request  Requires: constituency (constituency id)
     * @return JsonResponse
     */
    public function wards(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'constituency' => 'required|string|exists:constituencies,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $wards = Ward::where('constituency_id', $request->constituency)->get();

            return response()->json($wards);
        } catch (\Throwable $e) {
            Log::error('Wards failed: ' . $e->getMessage());

            return response()->json(['error' => 'Wards failed'], 500);
        }
    }

    /* =====================================================================
     |  CONTENT ENDPOINTS
     |===================================================================== */

    /**
     * List published events ordered by event date (ascending).
     *
     * @return JsonResponse
     */
    public function events(): JsonResponse
    {
        try {
            $events = Event::where('is_published', true)
                ->orderBy('event_date')
                ->get();

            return response()->json($events);
        } catch (\Throwable $e) {
            Log::error('Events failed: ' . $e->getMessage());

            return response()->json(['error' => 'Events failed'], 500);
        }
    }

    /**
     * List published blog posts, newest first.
     *
     * Only returns posts that are:
     *  - marked as published (`is_published = true`), and
     *  - have a `published_at` timestamp that is not in the future.
     *
     * Ordered by `published_at` descending so the newest post appears first.
     *
     * @return JsonResponse
     */
    public function news(): JsonResponse
    {
        try {
            $news = Blog::published()
                ->latest('published_at')
                ->get();

            return response()->json($news);
        } catch (\Throwable $e) {
            Log::error('News failed: ' . $e->getMessage());

            return response()->json(['error' => 'News failed'], 500);
        }
    }

    /**
     * List published gallery images.
     *
     * Route name kept as "gallerly" for backward compatibility with the
     * existing mobile clients. Consider adding a correctly-spelled alias.
     *
     * @return JsonResponse
     */
    public function gallerly(): JsonResponse
    {
        try {
            $gallery = Gallery::where('is_published', true)->get();

            return response()->json($gallery);
        } catch (\Throwable $e) {
            Log::error('Gallery failed: ' . $e->getMessage());

            return response()->json(['error' => 'Gallery failed'], 500);
        }
    }

    /* =====================================================================
     |  OTP (ONE-TIME PASSWORD) ENDPOINTS
     |===================================================================== */

    /**
     * Generate and dispatch an OTP via SMS or email.
     *
     * The OTP is cached for 5 minutes keyed by the normalized identifier
     * (phone number or email).
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function send(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'type' => ['required', 'string', 'in:phone,email'],
                'email' => ['required_if:type,email', 'email', 'max:255'],
                'phone' => ['required_if:type,phone', 'string', 'max:20'],
            ]);

            $otp = generateOtp();

            $identifier = $validated['type'] === 'phone'
                ? formatPhoneNumber($validated['phone'])
                : $validated['email'];

            // Store OTP for 5 minutes.
            Cache::put('otp_' . $identifier, $otp, now()->addMinutes(5));

            $message = 'Your EPA verification OTP is ' . $otp;

            if ($validated['type'] === 'phone') {
                $this->smsService->sendSms($identifier, $message);
            } else {
                Mail::to($identifier)->send(new OtpMail($otp));
            }

            return response()->json([
                'success' => true,
                'message' => 'OTP sent successfully',
                'expires_in' => 300, // seconds
            ]);
        } catch (\Throwable $e) {
            Log::error('OTP send failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to send OTP',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Verify an OTP for a given identifier (phone or email).
     *
     * On success the OTP is removed from the cache so it cannot be reused.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function verify(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'type' => ['required', 'string', 'in:phone,email'],
                'email' => ['required_if:type,email', 'email', 'max:255'],
                'phone' => ['required_if:type,phone', 'string', 'max:20'],
                'otp' => ['required', 'string', 'digits:6'],
            ]);

            $identifier = $validated['type'] === 'phone'
                ? formatPhoneNumber($validated['phone'])
                : $validated['email'];

            $cacheKey = 'otp_' . $identifier;
            $cachedOtp = Cache::get($cacheKey);

            if (!$cachedOtp) {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP expired or not found',
                ], 400);
            }

            if ((string) $cachedOtp !== (string) $validated['otp']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid OTP',
                ], 400);
            }

            Cache::forget($cacheKey);

            return response()->json([
                'success' => true,
                'message' => 'OTP verified successfully',
            ]);
        } catch (\Throwable $e) {
            Log::error('OTP verification failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'OTP verification failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /* =====================================================================
     |  MEMBER ENDPOINTS
     |===================================================================== */

    /**
     * Look up a member by national ID or phone number.
     *
     * Returns limited member information used for confirmation screens.
     * Unsubscribed members are rejected with a 404.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function confirm(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:id,phone',
            'value' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $type = $request->input('type');
            $value = $request->input('value');

            $user = $type === 'id'
                ? User::where('id_number', $value)->first()
                : User::where('phone', $value)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'No member found with those details',
                ], 404);
            }

            if ($user->status === 'unsubscribed') {
                return response()->json([
                    'success' => false,
                    'message' => 'You are no longer a member of EPA. If you unsubscribed by mistake, please contact us.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Member found',
                'member' => $user,
            ]);
        } catch (\Throwable $e) {
            Log::error('Member confirm failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mark a member as unsubscribed.
     *
     * NOTE: This endpoint trusts `member_id` and the provided OTP without
     * re-verifying them against the cache. Consider validating the OTP via
     * the `verify()` flow before allowing unsubscribe, or move OTP check
     * here to prevent unauthorized changes.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function unsubscribe(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'member_id' => 'required|integer|exists:users,id',
                'otp' => 'required|string|size:6',
                'verification_channel' => 'required|in:email,phone',
            ]);

            $user = User::findOrFail($request->member_id);

            $user->status = 'unsubscribed';
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'You have been successfully unsubscribed',
            ]);
        } catch (\Throwable $e) {
            Log::error('Unsubscribe failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}