<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_category_id',
        'title',
        'slug',
        'short_description',
        'description',
        'image',
        'price',
        'duration',
        'hotel',
        'transport',
        'visa_included',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'visa_included' => 'boolean',
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Get the category that owns the package.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(PackageCategory::class, 'package_category_id');
    }

    /**
     * Get all booking inquiries for this package.
     */
    public function bookingInquiries(): HasMany
    {
        return $this->hasMany(BookingInquiry::class, 'package_id');
    }
}
