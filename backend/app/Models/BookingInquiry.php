<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingInquiry extends Model
{
    use HasFactory;

    protected $table = 'booking_inquiries';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'package_id',
        'travel_date',
        'number_of_people',
        'message',
        'status',
    ];

    protected $casts = [
        'travel_date' => 'date',
        'number_of_people' => 'integer',
    ];

    /**
     * Get the package associated with the inquiry.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class, 'package_id');
    }
}
