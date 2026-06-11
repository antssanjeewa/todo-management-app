<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 *  Register Tests
 */

test('user can register successfully', function () {
    $user = User::factory()->make();

    $response = $this->postJson('/api/register', [
        'name' => $user->name,
        'email' => $user->email,
        'password' => $user->password,
        'password_confirmation' => $user->password,
    ]);

    $response->assertStatus(201)
        ->assertJsonPath('success', true)
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'name',
                'email',
                'access_token',
            ]
        ]);

    $this->assertDatabaseHas('users', [
        'email' => $user->email,
        'name' => $user->name,
    ]);
});

test('user cannot register with existing email', function () {
    $user = User::factory()->create();

    $response = $this->postJson('/api/register', [
        'name' => 'Test User',
        'email' => $user->email,
        'password' => $user->password,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors('email');
});

test('user registration fails with validation errors', function () {
    $response = $this->postJson('/api/register', [
        'name' => '',
        'email' => 'not-an-email',
        'password' => 'short',
        'password_confirmation' => 'different',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'password']);
});

/**
 *  Login Tests
 */

test('user can login successfully', function () {
    $password = 'secret123';
    $user = User::factory()->create([
        'password' => Hash::make($password),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => $password,
    ]);

    $response->assertStatus(200)
        ->assertJsonPath('success', true)
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'name',
                'email',
                'access_token',
            ]
        ]);
});

test('user login fails with invalid credentials', function () {
    $user = User::factory()->create();

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'wrongpassword',
    ]);

    $response->assertStatus(401)
        ->assertJsonPath('success', false)
        ->assertJsonPath('message', 'Invalid credentials.');
});

/**
 *  Logout Tests
 */

test('authenticated user can logout', function () {
    $user = User::factory()->create();
    $token = $user->createToken('auth_token')->plainTextToken;
    
    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJsonPath('success', true)
        ->assertJsonPath('message', 'Logged out successfully');
});

test('unauthenticated user cannot logout', function () {
    $response = $this->postJson('/api/logout');

    $response->assertStatus(401);
});

/**
 *  Profile Tests
 */

test('authenticated user can fetch their details', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/user');

    $response->assertStatus(200)
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.id', $user->id)
        ->assertJsonPath('data.email', $user->email);
});


test('guest user cannot access profile', function () {
    $response = $this->getJson('/api/user');

    $response->assertStatus(401);
});
