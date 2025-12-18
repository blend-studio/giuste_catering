<!DOCTYPE html>
<html>
<head>
    <title>Conferma Ricezione Richiesta - Giusté Catering</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #d32f2f;">Grazie per averci contattato, {{ $data['name'] }}!</h2>
        
        <p>Abbiamo ricevuto la tua richiesta di preventivo per il catering.</p>
        
        <p>Ecco un riepilogo dei dati che ci hai inviato:</p>
        <ul>
            <li><strong>Nome:</strong> {{ $data['name'] }}</li>
            <li><strong>Email:</strong> {{ $data['email'] }}</li>
            <li><strong>Data Evento:</strong> {{ $data['date'] ?? 'Non specificata' }}</li>
            <li><strong>Tipo Evento:</strong> {{ $data['type'] ?? 'Non specificato' }}</li>
            <li><strong>Messaggio:</strong><br> {{ $data['message'] }}</li>
        </ul>

        <p>Il nostro team analizzerà la tua richiesta e ti risponderà il prima possibile.</p>

        <p>Cordiali saluti,<br>
        <strong>Il Team di Giusté Food Truck</strong></p>
    </div>
</body>
</html>