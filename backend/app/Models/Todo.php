<?php

namespace App\Models;

use App\Enum\TodoPriority;
use App\Enum\TodoStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'due_date',
        'priority',
        'status',
    ];

    protected $casts = [
        'status' => TodoStatus::class,
        'priority' => TodoPriority::class,
        'due_date' => 'date:Y-m-d',
    ];

    protected $appends = ['is_overdue'];

    /**
     * Virtual attribute: true if pending and due date has passed
     */
    public function getIsOverdueAttribute(): bool
    {
        return $this->due_date
            && $this->status === TodoStatus::PENDING
            && $this->due_date->isPast();
    }

    /**
     * A todo belongs to one user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
