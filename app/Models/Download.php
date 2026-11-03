<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Filesystem\FilesystemAdapter;

class Download extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'file_path',
        'file_type',
        'file_size',
        'version',
        'download_count',
        'is_featured',
        'tags',
        'published_at',
        'is_published',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'download_count' => 'integer',
        'published_at' => 'datetime',
    ];

    /**
     * Relative path on the "public" disk, e.g. "documents/form-1.pdf".
     */
    protected const DISK = 'public';

    /**
     * Publicly accessible URL for the file (via /storage symlink).
     */
    public function getUrlAttribute(): ?string
    {
        if (!$this->file_path) {
            return null;
        }

        /** @var FilesystemAdapter $disk */
        $disk = Storage::disk(self::DISK);

        return $disk->url($this->file_path);
    }

    /**
     * Absolute filesystem path (useful for downloads/streaming).
     */
    public function getAbsolutePathAttribute(): ?string
    {
        return $this->file_path
            ? Storage::disk(self::DISK)->path($this->file_path)
            : null;
    }

    /**
     * Scope: only publicly visible downloads.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function incrementDownloadCount(): void
    {
        $this->increment('download_count');
    }
}