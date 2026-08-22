<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OverseasService extends Model
{
    use HasFactory;

    protected $table = 'overseas_services';

    protected $fillable = [
        'country',
        'title',
        'slug',
        'description',
        'image',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    /**
     * Get the full public URL for the overseas service image.
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
