<?php

namespace App\Http\Controllers;

use App\Models\Cabin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CabinController extends Controller
{
    public function index(Request $request)
    {
        $searchParams = $request->query();

        $query = Cabin::query();

        // Sorting logic
        switch ($request->query('sort_by')) {
            case 'price_asc':
                $query->orderBy('regularPrice', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('regularPrice', 'desc');
                break;
            case 'maxCapacity_asc':
                $query->orderBy('maxCapacity', 'asc');
                break;
            case 'maxCapacity_desc':
                $query->orderBy('maxCapacity', 'desc');
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            default:
                $query->latest();
                break;
        }

        $cabins = $query->get();

        return Inertia::render('Cabins/Index', [
            'cabins' => $cabins,
            'searchParams' => $searchParams,
        ]);
        
   
    }

   
    public function update(Request $request, Cabin $cabin)
    {
        $validated = $request->validate([
            'name' => ['required', 'min:5'],
            'maxCapacity' => ['required', 'integer', 'min:1'],
            'regularPrice' => ['required', 'integer', 'min:1'],
            'discount' => ['required', 'integer', 'lt:regularPrice'],
            'description' => ['required'],
            'image' => ['nullable', 'image']
        ]);

        if ($request->hasFile('image')) {
            // Optionally delete the old image
            if ($cabin->image) {
                $oldImagePath = str_replace(asset('storage/'), '', $cabin->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $filePath = $request->file('image')->store('cabin-images', 'public');
            $validated['image'] = asset('storage/' . $filePath);
        }
        $cabin->update($validated);
    }

    public function store(Request $request)
    {

        $validated =  $request->validate([
               'name' => ['required', 'min:5'],
               'maxCapacity' => ['required', 'integer', 'min:1'],
               'regularPrice' => ['required', 'integer', 'min:1'],
               'discount' => ['required', 'integer'],
               'description' => ['required'],
               'image' => ['nullable', 'image']
           ]);

        $filePath = $request->file('image')?->store('cabin-images', 'public');
        $imagePath = asset('storage/' . $filePath);

        Cabin::create(array_merge($validated, [
            'image' => $imagePath,
        ]));

        /* Laravel uses a symbolic link to access the files in the storage/app/public directory via the public/storage URL. Ensure you have created this symbolic link by running the following Artisan command:

        php artisan storage:link */

        return redirect('/cabins');
       
    }


    public function destroy(Cabin $cabin)
    {
        $cabin->delete();
        
        return redirect('/cabins');
    }

}
