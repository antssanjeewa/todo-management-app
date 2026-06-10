<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
  public function toArray($request): array
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'description' => $this->description,
      'priority' => $this->priority,
      'status' => $this->status,
      'is_overdue' => $this->is_overdue,
      'due_date' => $this->due_date,
      'created_at' => $this->created_at->toDateTimeString(),
    ];
  }
}