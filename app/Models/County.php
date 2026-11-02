<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class County extends Model
{
    use HasFactory;

    protected $fillable = [
        'county_code',
        'county_name',
    ];

    public function constituencies(): HasMany
    {
        return $this->hasMany(Constituency::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
