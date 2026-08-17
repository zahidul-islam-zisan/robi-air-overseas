<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PackageCategory extends Model
{
    use HasFactory;

    protected $table = 'package_categories';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get all packages for this category.
     */
    public function packages(): HasMany
    {
        return $this->hasMany(Package::class, 'package_category_id');
    }
}
