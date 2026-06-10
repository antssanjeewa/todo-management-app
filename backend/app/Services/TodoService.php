<?php

namespace App\Services;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TodoService
{
  public function getFilteredTodos(User $user, array $filters): Collection
  {
    $query = Todo::where('user_id', $user->id);

    if (!empty($filters['search'])) {
      $search = $filters['search'];
      $query->where(function ($q) use ($search) {
        $q->where('title', 'ilike', "%{$search}%")
          ->orWhere('description', 'ilike', "%{$search}%");
      });
    }

    if (!empty($filters['status']) && $filters['status'] !== 'all') {
      $query->where('status', $filters['status']);
    }

    if (!empty($filters['priority']) && $filters['priority'] !== 'all') {
      $query->where('priority', $filters['priority']);
    }

    return $query
      ->orderByRaw("CASE status WHEN 'pending' THEN 0 ELSE 1 END")
      ->orderBy('created_at', 'desc')
      ->get();
  }

  public function getCounts(User $user): array
  {
    $base = Todo::where('user_id', $user->id);

    return [
      'total' => (clone $base)->count(),
      'completed' => (clone $base)->where('status', 'completed')->count(),
      'pending' => (clone $base)->where('status', 'pending')->count(),
    ];
  }

  public function create(User $user, array $data): Todo
  {
    return Todo::create([...$data, 'user_id' => $user->id]);
  }

  public function update(Todo $todo, array $data): Todo
  {
    $todo->update($data);
    return $todo->fresh();
  }

  public function delete(Todo $todo): void
  {
    $todo->delete();
  }

  public function toggleStatus(Todo $todo): Todo
  {
    $todo->update([
      'status' => $todo->status === 'completed' ? 'pending' : 'completed',
    ]);
    return $todo->fresh();
  }
}