<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create()
    {
        return Inertia::render('Login');
    }

    public function store(Request $request)
    {
       
        $attributes = $request->validate([
           'email' => ['required', 'email'],
           'password' => ['required'],
        ]);
        
        if (!Auth::attempt($attributes, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'The provided credentials are incorrect.',
            ])->onlyInput('email');
        }

        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

 
    public function destroy(Request $request)
    {
        
        Auth::logout(); // Log the user out

        $request->session()->invalidate();      // Invalidate session
        $request->session()->regenerateToken(); // Prevent CSRF reuse

        return redirect('/login'); // Or wherever you want
    }

}
