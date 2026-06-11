<?php

use App\Models\User;
use App\Models\Todo;
use App\Enum\TodoStatus;
use App\Enum\TodoPriority;

/**
 *  INDEX
 */

test('user can list only their own todos', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    Todo::factory()->count(3)->create(['user_id' => $user->id]);
    Todo::factory()->count(2)->create(['user_id' => $otherUser->id]);

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/todos');

    $response->assertStatus(200)
        ->assertJsonCount(3, 'data')
        ->assertJsonPath('meta.total', 3);
});

test('user can filter todos by status', function () {
    $user = User::factory()->create();

    Todo::factory()->create([
        'user_id' => $user->id,
        'status' => TodoStatus::COMPLETED,
    ]);

    Todo::factory()->count(2)->create([
        'user_id' => $user->id,
        'status' => TodoStatus::PENDING,
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/todos?status=completed');

    $response->assertStatus(200)
        ->assertJsonCount(1, 'data');
});

test('user can filter todos by priority', function () {
    $user = User::factory()->create();

    Todo::factory()->create([
        'user_id' => $user->id,
        'priority' => TodoPriority::HIGH,
    ]);

    Todo::factory()->count(2)->create([
        'user_id' => $user->id,
        'priority' => TodoPriority::LOW,
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/todos?priority=high');

    $response->assertStatus(200)
        ->assertJsonCount(1, 'data');
});

test('user can search todos by title or description', function () {
    $user = User::factory()->create();

    Todo::factory()->create([
        'user_id' => $user->id,
        'title' => 'Searchable Todo Title',
        'description' => 'Normal text',
    ]);

    Todo::factory()->create([
        'user_id' => $user->id,
        'title' => 'Another title',
        'description' => 'Searchable description text',
    ]);

    Todo::factory()->create([
        'user_id' => $user->id,
        'title' => 'Unrelated title',
        'description' => 'Unrelated description',
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/todos?search=Searchable');

    $response->assertStatus(200)
        ->assertJsonCount(2, 'data');
});

/**
 *  STORE
 */

test('user can create a todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->make();

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/todos', [
            'title' => $todo->title,
            'description' => $todo->description,
            'due_date' => now()->addDays(5)->format('Y-m-d'),
            'priority' => TodoPriority::MEDIUM->value,
        ]);

    $response->assertStatus(201)
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.title', $todo->title);

    $this->assertDatabaseHas('todos', [
        'user_id' => $user->id,
        'title' => $todo->title,
        'description' => $todo->description,
        'priority' => TodoPriority::MEDIUM,
    ]);
});

test('todo creation fails with invalid validation', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/todos', [
            'title' => '',
            'due_date' => 'yesterday', 
            'priority' => 'invalid-priority',
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'due_date', 'priority']);
});

/**
 *  UPDATE
 */

test('user can update their own todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create([
        'user_id' => $user->id
    ]);

    $newTitle = $todo->title . ' Updated';
    

    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/todos/{$todo->id}", [
            'title' => $newTitle,
            'description' => $todo->description,
            'due_date' => now()->addDays(10)->format('Y-m-d'),
            'priority' => TodoPriority::HIGH->value,
        ]);

    $response->assertStatus(200)
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.title', $newTitle);

    $this->assertDatabaseHas('todos', [
        'id' => $todo->id,
        'title' => $newTitle,
        'user_id' => $user->id,
        'description' => $todo->description,
        'due_date' => now()->addDays(10)->format('Y-m-d'),
        'priority' => TodoPriority::HIGH,
    ]);
});

test('user cannot update other users todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/todos/{$todo->id}", [
            'title' => 'Malicious Update',
        ]);

        
    $response->assertStatus(403);
});

test('todo update validation fails', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create([
        'user_id' => $user->id
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/todos/{$todo->id}", [
            'title' => '',
            'due_date' => 'yesterday',
            'priority' => 'invalid',
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'due_date', 'priority']);
});

/**
 *  DELETE
 */

test('user can delete their own todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/todos/{$todo->id}");

    $response->assertStatus(200)
        ->assertJsonPath('success', true);

    $this->assertSoftDeleted('todos', [
        'id' => $todo->id,
    ]);
});

test('user cannot delete other users todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/todos/{$todo->id}");

    $response->assertStatus(403);
});

/**
 *  TOGGLE
 */

test('user can toggle status of their own todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create([
        'user_id' => $user->id,
        'status' => TodoStatus::PENDING,
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->patchJson("/api/todos/{$todo->id}/toggle");

    $response->assertStatus(200)
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.status', TodoStatus::COMPLETED);

    $this->assertDatabaseHas('todos', [
        'id' => $todo->id,
        'user_id' => $user->id,
        'status' => TodoStatus::COMPLETED,
    ]);
});

test('user cannot toggle status of other users todo', function () {
    $user = User::factory()->create();
    $todo = Todo::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->patchJson("/api/todos/{$todo->id}/toggle");

    $response->assertStatus(403);
});
