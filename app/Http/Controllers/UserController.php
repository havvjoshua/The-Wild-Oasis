<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Account');
        
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            'max:255',
            Rule::unique('users')->ignore($user->id),
        ],
        'avatar' => 'nullable|image|max:2048',
    ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->save();

        return redirect('/account');

        
    }

    public function updatePassword(Request $request)
    {
        
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect('/account');
    }

    public function updateTheme(Request $request)
    {
        $request->validate([
            'theme' => ['required', 'in:dark,light'],
        ]);

        $request->user()->update([
            'theme' => $request->input('theme'),
        ]);

        return back();
    }
}
