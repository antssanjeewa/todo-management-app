<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function __construct(protected AuthService $authService)
  {
  }

  /**
   * Register a new user
   */
  public function register(RegisterRequest $request): JsonResponse
  {
    $user = $this->authService->register($request->validated());

    return ApiResponse::success($user, 'Registration successful!', 201);
  }

  /**
   * Login user
   */
  public function login(LoginRequest $request): JsonResponse
  {
    $user = $this->authService->login($request->validated());

    if (!$user) {
      return ApiResponse::error('Invalid credentials.', 401, ['email' => ['The provided credentials are incorrect.']]);
    }

    return ApiResponse::success($user, 'Login successful');
  }

  /**
   * Logout user
   */
  public function logout(Request $request): JsonResponse
  {
    $this->authService->logout($request->user());

    return ApiResponse::success(null, 'Logged out successfully');
  }

  /**
   * Get current user
   */
  public function user(Request $request): JsonResponse
  {
    return ApiResponse::success($request->user());
  }
}