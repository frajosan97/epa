<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'name',
        'code',
        'dial_code',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}