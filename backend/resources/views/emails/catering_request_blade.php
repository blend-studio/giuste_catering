<!DOCTYPE html>
<html>
<head>
    <title>Nuova Richiesta Catering</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

    <h2 style="color: #325541;">Nuova Richiesta dal Sito (Giustè)</h2>

    <p>Hai ricevuto una nuova richiesta di catering. Ecco i dettagli:</p>

    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['name'] }}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['email'] }}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Data Evento:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['date'] ?? 'Non specificata' }}</td>
        </tr>
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tipo Evento:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['type'] ?? 'Non specificato' }}</td>
        </tr>
    </table>

    <br>
    <p><strong>Messaggio del cliente:</strong></p>
    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #325541;">
        {{ $data['message'] }}
    </div>

</body>
</html>