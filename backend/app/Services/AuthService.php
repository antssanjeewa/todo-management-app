<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService
{
  /**
   * Register a new user and generate access token.
   */
  public function register(array $data): User
  {
    $user = User::create($data);
    $user['access_token'] = $user->createToken('auth_token')->plainTextToken;

    return $user;
  }

  /**
   * Authenticate a user and generate access token.
   */
  public function login(array $credentials): ?User
  {
    if (!Auth::attempt($credentials)) {
      return null;
    }

    $user = User::where('email', $credentials['email'])->firstOrFail();
    $user['access_token'] = $user->createToken('auth_token')->plainTextToken;

    return $user;
  }

  /**
   * Revoke the user's current token.
   */
  public function logout(User $user): void
  {
    $user->currentAccessToken()->delete();
  }
}
