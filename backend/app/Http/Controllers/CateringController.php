<?php
// app/Http/Controllers/CateringController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CateringInquiry;
use Illuminate\Support\Facades\Mail;
use App\Mail\CateringRequestMail;
use App\Mail\CateringConfirmationMail;

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
        $adminEmail = env('MAIL_TO', 'info@blendstudio.it');
        $ccEmail = env('MAIL_CC');

        $mail = Mail::to($adminEmail);
        if ($ccEmail) {
            $mail->cc($ccEmail);
        }
        $mail->send(new CateringRequestMail($validated));

        // 3. Invia Mail di conferma al cliente
        Mail::to($validated['email'])->send(new CateringConfirmationMail($validated));

        return response()->json(['message' => 'Richiesta inviata con successo!'], 201);
    }
}