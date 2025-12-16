<?php
// app/Http/Controllers/CateringController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CateringInquiry;
use Illuminate\Support\Facades\Mail;
use App\Mail\CateringRequestMail;

class CateringController extends Controller
{
    public function store(Request $request)
    {
        // Validazione
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
            'date' => 'nullable|date',
            'type' => 'nullable|string'
        ]);

        // 1. Salva nel DB (MySQL)
        $inquiry = CateringInquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'event_date' => $validated['date'] ?? null,
            'event_type' => $validated['type'] ?? 'Generico',
        ]);

        // 2. Invia Mail all'admin
        // Assicurati di aver configurato .env con SMTP
        Mail::to('info@giustefoodtruck.com')->send(new CateringRequestMail($validated));

        return response()->json(['message' => 'Richiesta inviata con successo!'], 201);
    }
}