<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    protected $fillable = [
        'type',
        'reference_no',
        'title',
        'subtitle',
        'organization',
        'body',
        'summary',
        'issued_by',
        'signatory_name',
        'signatory_title',
        'tagline',
        'image',
        'file_path',
        'location',
        'published_at',
        'is_published',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    /**
     * Scope: only publicly visible publications (published + not in the future).
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope: filter by type (e.g. public-notice, press-release).
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}