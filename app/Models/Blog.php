<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'published_at',
        'location',
        'image',
        'description',
        'is_published',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    /**
     * Scope: only publicly visible blog posts.
     *
     * A post is visible when it is explicitly published AND its
     * `published_at` timestamp has already passed. This supports
     * scheduling — future-dated posts stay hidden until their time.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}