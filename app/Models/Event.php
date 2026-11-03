<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'event_date',
        'event_time',
        'location',
        'image',
        'description',
        'is_published',
    ];

    protected $casts = [
        'event_date' => 'date:Y-m-d',
        'is_published' => 'boolean',
    ];
}