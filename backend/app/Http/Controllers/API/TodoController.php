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
use App\Http\Responses\ApiResponse;

class TodoController extends Controller
{

  public function __construct(protected TodoService $todoService)
  {
  }

  /**
   * List all todos
   * 
   */
  public function index(Request $request): JsonResponse
  {

    $this->authorize('viewAny', Todo::class);

    $todos = $this->todoService->getFilteredTodos($request->user(), $request->only('search', 'status', 'priority'));

    return ApiResponse::paginated($todos, TodoResource::class);
  }

  /**
   * Create a todo
   *
   */
  public function store(StoreTodoRequest $request): JsonResponse
  {
    $todo = $this->todoService->create($request->user(), $request->validated());

    return ApiResponse::success(new TodoResource($todo), 'Todo created successfully', 201);
  }

  /**
   * Update a todo
   * 
   */
  public function update(UpdateTodoRequest $request, Todo $todo): JsonResponse
  {
    $todo = $this->todoService->update($todo, $request->validated());

    return ApiResponse::success(new TodoResource($todo), 'Todo updated successfully');
  }

  /**
   * Delete a todo
   * 
   */
  public function destroy(Request $request, Todo $todo): JsonResponse
  {
    $this->authorize('delete', $todo);

    $this->todoService->delete($todo);

    return ApiResponse::success(null, 'Todo deleted successfully');
  }

  /**
   * Toggle status of a todo
   * 
   */
  public function toggleStatus(Request $request, Todo $todo): JsonResponse
  {
    $this->authorize('update', $todo);

    $todo = $this->todoService->toggleStatus($todo);

    return ApiResponse::success(new TodoResource($todo), 'Status updated');
  }
}