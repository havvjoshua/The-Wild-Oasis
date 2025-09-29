<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::first();
    
        return Inertia::render('Settings', [
          'settings' => $settings
        ]);
    }

    public function update(Request $request, Setting $setting)
    {
        $validated =  $request->validate([
           'minBookingLength' => ['required', 'integer', 'min:3'],
           'maxBookingLength' => ['required', 'integer', 'max:100'],
           'maxGuestsPerBooking' => ['required', 'integer', 'max:30'],
           'breakfastPrice' => ['required', 'integer', 'min:30'],
           
         ]);

        $setting->update(array_merge($validated));

        return redirect('/settings');
    }
}
