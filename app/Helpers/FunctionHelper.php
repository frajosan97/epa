<?php

use Illuminate\Support\Str;

if (!function_exists('generateOtp')) {
    function generateOtp(): int
    {
        return random_int(100000, 999999);
    }
}

if (!function_exists('formatPhoneNumber')) {
    function formatPhoneNumber(string $phoneNumber): string
    {
        $phoneNumber = preg_replace('/[\s()-]/', '', $phoneNumber);

        if (preg_match('/^0[17]\d{8}$/', $phoneNumber)) {
            return '254' . substr($phoneNumber, 1);
        }

        if (str_starts_with($phoneNumber, '+254')) {
            return substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }
}
