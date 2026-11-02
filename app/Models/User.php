<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id_number',
        'sir_name',
        'first_name',
        'last_name',
        'dob',
        'sex',
        'ethnicity',
        'membership_categories',
        'pwd_number',
        'reside_in_kenya',
        'country_of_residence',
        'religion',
        'county_id',
        'constituency_id',
        'ward_id',
        'location_id',
        'prefered_channel',
        'phone',
        'phone_verified_at',
        'email',
        'email_verified_at',
        'password',
        'privacy_acceptance',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'dob' => 'date',
        'membership_categories' => 'array',
        'privacy_acceptance' => 'boolean',
    ];

    public function county(): BelongsTo
    {
        return $this->belongsTo(County::class);
    }

    public function constituency(): BelongsTo
    {
        return $this->belongsTo(Constituency::class);
    }

    public function ward(): BelongsTo
    {
        return $this->belongsTo(Ward::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
