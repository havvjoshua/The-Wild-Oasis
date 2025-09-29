<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    
    public function create()
    {
        return Inertia::render('Register');
        
    }

    public function store(Request $request)
    {
        
        //validate
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:5'],
            'avatar' => ['nullable']
        ]);

        //create user
        $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'avatar' => $request->avatar,
        'password' => Hash::make($request->password),
    ]);

        //login
        Auth::login($user);

        //redirect
        return redirect('/dashboard');

    }
}
