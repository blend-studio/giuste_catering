<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CateringRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * QUI sta il trucco: devi dichiarare la variabile pubblica.
     * Le variabili pubbliche nei Mailable vengono passate AUTOMATICAMENTE alla vista.
     */
    public $data;

    /**
     * Create a new message instance.
     * Accettiamo i dati dal controller qui.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope (Oggetto della mail).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nuova Richiesta Catering - Giustè', // Oggetto personalizzato
        );
    }

    /**
     * Get the message content definition (La View).
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.catering_request', // Assicurati che questo file esista (vedi punto 2)
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}