<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  /**
   * Register a new user
   */
  public function register(Request $request): JsonResponse
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|string|min:8|confirmed',
      'password_confirmation' => 'required',
    ]);

    $user = User::create($validated);

    $token = $user->createToken('auth_token')->plainTextToken;
    $user['access_token'] = $token;

    return response()->apiSuccess($user, 'Registration successful!', 201);
  }

  /**
   * Login user and return token
   */
  public function login(Request $request): JsonResponse
  {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required|string',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
      return response()->apiError('Invalid credentials.', ['email' => ['The provided credentials are incorrect.']], 401);
    }

    $user = User::where('email', $request->email)->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;
    $user['access_token'] = $token;

    return response()->apiSuccess($user, 'Login successful');
  }

  /**
   * Logout user (revoke current token)
   */
  public function logout(Request $request): JsonResponse
  {
    $request->user()->currentAccessToken()->delete();

    return response()->apiSuccess(null, 'Logged out successfully');
  }

  /**
   * Get currently authenticated user
   */
  public function user(Request $request): JsonResponse
  {
    return response()->apiSuccess($request->user());
  }
}