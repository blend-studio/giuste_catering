<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceCharterDownload;
use Illuminate\Support\Facades\Storage;


class ServiceCharterController extends Controller
{
    public function download(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // Track the download
        ServiceCharterDownload::create([
            'email' => $request->email,
        ]);

        // Path to the file in storage/app
        $path = 'carta-servizi.pdf';

        if (!Storage::disk('local')->exists($path)) {
            return response()->json(['message' => 'File non trovato.'], 404);
        }

        return Storage::disk('local')->download($path, 'Carta-Servizi-Giuste.pdf');
    }
}