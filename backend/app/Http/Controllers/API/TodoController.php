<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Todo\StoreTodoRequest;
use App\Http\Requests\Todo\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Services\TodoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{

  public function __construct(protected TodoService $todoService)
  {
  }

  public function index(Request $request): JsonResponse
  {

    $this->authorize('viewAny', Todo::class);

    $todos = $this->todoService->getFilteredTodos($request->user(), $request->only('search', 'status', 'priority'));
    $counts = $this->todoService->getCounts($request->user());

    return response()->apiSuccess(
      [
        'todos' => TodoResource::collection($todos),
        'counts' => $counts,
      ]
    );
  }

  public function store(StoreTodoRequest $request): JsonResponse
  {
    $todo = $this->todoService->create($request->user(), $request->validated());

    return response()->apiSuccess(new TodoResource($todo), 'Todo created successfully', 201);
  }

  public function update(UpdateTodoRequest $request, Todo $todo): JsonResponse
  {
    $todo = $this->todoService->update($todo, $request->validated());

    return response()->apiSuccess(new TodoResource($todo), 'Todo updated successfully');
  }

  public function destroy(Request $request, Todo $todo): JsonResponse
  {
    $this->authorize('delete', $todo);

    $this->todoService->delete($todo);

    return response()->apiSuccess(null, 'Todo deleted successfully');
  }

  public function toggleStatus(Request $request, Todo $todo): JsonResponse
  {
    $this->authorize('update', $todo);

    $todo = $this->todoService->toggleStatus($todo);

    return response()->apiSuccess(new TodoResource($todo), 'Status updated');
  }
}