<?php

namespace App\Services;

use App\Enum\TodoStatus;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class TodoService
{
  public function getFilteredTodos(User $user, array $filters): LengthAwarePaginator
  {
    $query = Todo::where('user_id', $user->id);

    if (!empty($filters['search'])) {
      $search = $filters['search'];
      $likeOperator = DB::connection()->getDriverName() === 'sqlite' ? 'like' : 'ilike';
      $query->where(function ($q) use ($search, $likeOperator) {
        $q->where('title', $likeOperator, "%{$search}%")
          ->orWhere('description', $likeOperator, "%{$search}%");
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
      ->latest()
      ->paginate();
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
      'status' => $todo->status === TodoStatus::COMPLETED ? TodoStatus::PENDING : TodoStatus::COMPLETED,
    ]);
    return $todo->fresh();
  }
}