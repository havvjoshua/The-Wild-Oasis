<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
          //Optional: flash messages
          'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        
             // Share auth info (available in all React pages)
            'auth' => [
                'user' => $request->user(),
            ],
            // Optional: flash messages
        

        // Theme for dark mode (fallback to null if not logged in)
        'theme' => fn () => $request->user()?->theme ?? null,
      ]);

        
    }

}
