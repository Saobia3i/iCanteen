<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MenuItemController extends Controller
{
    /**
     * Create menu item (staff)
     * Accepts either:
     *  - image_key  (string for frontend asset mapping), OR
     *  - image_file (uploaded file), OR
     *  - image_url  (external URL)
     */
    public function store(Request $r)
    {
        $data = $r->validate([
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'price'        => 'required|numeric|min:0',
            'image_key'    => 'nullable|string|max:100',
            'image_url'    => 'nullable|url|max:2048',
            'image_file'   => 'nullable|file|image|max:2048', // <= 2MB
            'is_available' => 'boolean',
        ]);

        // handle file upload if provided
        if ($r->hasFile('image_file')) {
            $path = $r->file('image_file')->store('public/menu'); // storage/app/public/menu
            // public URL
            $data['image_url'] = Storage::url($path);            // /storage/menu/xxx.jpg
        }

        $data['is_available'] = $data['is_available'] ?? true;

        $item = MenuItem::create($data);

        return response()->json($item, 201);
    }

    /**
     * Update menu item (staff)
     */
    public function update(Request $r, $id)
    {
        $item = MenuItem::findOrFail($id);

        $data = $r->validate([
            'name'         => 'sometimes|string|max:255',
            'description'  => 'sometimes|nullable|string',
            'price'        => 'sometimes|numeric|min:0',
            'image_key'    => 'sometimes|nullable|string|max:100',
            'image_url'    => 'sometimes|nullable|url|max:2048',
            'image_file'   => 'sometimes|file|image|max:2048',
            'is_available' => 'sometimes|boolean',
        ]);

        // new upload replaces old file path
        if ($r->hasFile('image_file')) {
            $path = $r->file('image_file')->store('public/menu');
            $data['image_url'] = Storage::url($path);
        }

        $item->update($data);

        return response()->json($item);
    }

    /**
     * Delete menu item (staff)
     */
    public function destroy($id)
    {
        $item = MenuItem::findOrFail($id);
        $item->delete();
        return response()->json(['ok' => true]);
    }
}
