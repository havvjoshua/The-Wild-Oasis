<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cabin;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
   
    public function index(Request $request)
    {
        $last = $request->query('last'); // e.g. 7, 30, 90
        $startDate = null;
        $endDate = null;

        if (is_numeric($last)) {
            $startDate = Carbon::now()->subDays((int) $last)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        }

        // Bookings within date range
        $bookings = Booking::query()
            ->when($startDate, fn ($q) => $q->whereBetween('start_date', [$startDate, $endDate]))
            ->orderBy('start_date', 'desc')
            ->get();

        $confirmedStays = Booking::query()
      ->whereIn('status', ['checked-in', 'checked-out'])
      ->when($startDate, fn ($q) => $q->whereBetween('start_date', [$startDate, $endDate]))
      ->orderBy('start_date', 'desc')
      ->get()
      ->map(function ($booking) {
          // ⚠️ Parse and strip time to get whole-day diff
          $start = Carbon::parse($booking->start_date)->startOfDay();
          $end = Carbon::parse($booking->end_date)->startOfDay();

          return [
              'id' => $booking->id,
              'start_date' => $booking->start_date,
              'end_date' => $booking->end_date,
              'status' => $booking->status,
              'numNights' => $start->diffInDays($end), // ✅ will now be INT
          ];
      });

        // Cabin count
        $cabinCount = Cabin::count();

        // Group bookings by day and sum sales
        $salesData = Booking::query()
            ->when($startDate, fn ($q) => $q->whereBetween('start_date', [$startDate, $endDate]))
            ->selectRaw("DATE(start_date) as date, SUM(total_price) as totalSales, SUM(extras_price) as extrasSales")
            ->groupByRaw("DATE(start_date)")
            ->orderBy("date")
            ->get()
            ->map(fn ($row) => [
                'label' => Carbon::parse($row->date)->format('M d'),
                'totalSales' => (float) $row->totalSales,
                'extrasSales' => (float) $row->extrasSales,
            ]);

        $today = Carbon::today();

        // Guests arriving today with unconfirmed bookings
        $todaysArrivals = Booking::with(['guest', 'cabin'])
        ->where('status', 'unconfirmed')
        ->whereDate('start_date', $today)
        ->orderBy('created_at', 'desc')
        ->get();

        // Guests leaving today (checked-in and ending today)
        $todaysDepartures = Booking::with(['guest', 'cabin'])
        ->where('status', 'checked-in')
        ->whereDate('end_date', $today)
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render('Dashboard', [
            'bookings' => $bookings,
            'confirmedStays' => $confirmedStays,
            'cabinCount' => $cabinCount,
            'last' => is_numeric($last) ? (int) $last : null,
            'salesData' => $salesData,
            'startDate' => $startDate?->toDateString(), // ← "2025-01-01"
    
            'endDate' => $endDate?->toDateString(),     // ← "2025-03-31"
            'todaysArrivals' => $todaysArrivals,
            'todaysDepartures' => $todaysDepartures,
        ]);
    }
}
