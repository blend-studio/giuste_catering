<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CateringInquiry extends Model
{
    use HasFactory;

    /**
     * La tabella associata al modello (opzionale se segui le convenzioni, ma meglio essere espliciti)
     */
    protected $table = 'catering_inquiries';

    /**
     * I campi che possono essere assegnati in massa (Mass Assignment).
     * Fondamentale per far funzionare il metodo ::create() nel Controller.
     */
    protected $fillable = [
        'name',
        'email',
        'message',
        'event_date',
        'event_type',
        'is_read' // Utile se in futuro farai un pannello admin
    ];

    /**
     * Cast automatico dei tipi di dato.
     */
    protected $casts = [
        'event_date' => 'date',
        'is_read' => 'boolean',
    ];
}