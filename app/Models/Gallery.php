<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'category',
        'title',
        'image',
        'description',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}