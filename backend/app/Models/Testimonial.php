<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'customer_role',
        'message',
        'image',
        'rating',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'rating' => 'integer',
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    /**
     * Get the full public URL for the testimonial image.
     */
    public function getImageUrlAttribute(): string
    {
        if (! $this->image) {
            return '';
        }

        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }
}
