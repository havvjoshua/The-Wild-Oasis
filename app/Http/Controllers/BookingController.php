<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cabin;
use App\Models\Guest;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
 
    public function index(Request $request)
    {
        $status = $request->input('status');
        $sortBy = $request->input('sort_by', 'latest');

        $bookings = Booking::when($status, function ($query, $status) {
            return $query->where('status', $status);
        })
        ->when($sortBy, function ($query, $sortBy) {
            switch ($sortBy) {
                case 'oldest':
                    return $query->orderBy('start_date', 'asc');
                case 'latest':
                    return $query->orderBy('start_date', 'desc');
                case 'price-low-high':
                    return $query->orderBy('total_price', 'asc');
                case 'price-high-low':
                    return $query->orderBy('total_price', 'desc');
                    // Add more sorting options as needed
                default:
                    return $query;
            }
        })
        ->paginate(5) // Use pagination here
        ->withQueryString(); // Preserve query params in pagination links

        $cabins = Cabin::all();
        $guests = Guest::all();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'cabins' => $cabins,
            'guests' => $guests,
            'filters' => [
                'status' => $status,
                'sort_by' => $sortBy,
            ],
        ]);
    }

    public function show(Request $request, Booking $booking)
    {
        $booking->load(['guest', 'cabin']);
        return Inertia::render('Bookings/Show', [
          'booking' => $booking
        ]);
    }

    public function showCheckinPage(Request $request, Booking $booking)
    {
        $settings = Setting::first();
        $booking->load(['guest', 'cabin',]);
        return Inertia::render('Bookings/Checkin', [
            'booking' => $booking,
            'settings' => $settings
        ]);
    }

    public function checkIn(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:checked-in',
            'is_paid' => 'required|boolean',
            'has_breakfast' => 'sometimes|boolean',
        ]);

        $booking->status = $validated['status'];
        $booking->is_paid = $validated['is_paid'];

        if (!empty($validated['has_breakfast']) && !$booking->has_breakfast) {

            $cost = $booking->calculateBreakfastCost();
            $booking->has_breakfast = true;
            $booking->total_price += $cost;
        }

        
        
        $booking->save();

        return redirect()->back();
    }

    public function checkOut(Request $request, Booking $booking)
    {
        

        $booking->update([
            'status' => 'checked-out',
        ]);

        return redirect()->back();
        
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        
        return redirect('/bookings');
    }
}
