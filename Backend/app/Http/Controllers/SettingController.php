<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class SettingController extends Controller
{
     public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $request->user()->id,
        ]);

        $user = $request->user();
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Email updated successfully',
            'user' => $user
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => ['required', 'confirmed', Password::min(8)
                ->mixedCase()
                ->numbers()
                ->symbols()
            ],
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }

    public function getProfile(Request $request)
    {
        return response()->json($request->user());
    }
}
