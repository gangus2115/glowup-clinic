# INTEGRACJE Z n8n I STRUKTURA DANYCH

Backend automatyzacji oparty jest o serwer n8n. Nasza strona musi komunikować się z nim w określonych przypadkach. Wszystkie webhooki n8n znajdują się pod adresem bazowym: `https://huge-cuscus.pikapod.net`

## 1. Moduł: Formularz "Prośba o kontakt / Lead"
Jeśli na stronie zrobimy sekcję "Zostaw numer, a oddzwonimy", frontend musi wysłać POST na poniższy endpoint.

- **Endpoint:** `POST /webhook/lead`
- **Wymagany Payload (JSON):** *Uwaga: Klucze muszą mieć polskie znaki i wielkie litery!*
  ```json
  {
    "typ_akcji": "lead",
    "Imię": "string",
    "Telefon": "string",
    "Zabieg": "string (opcjonalnie)",
    "Status wizyty": "Prośba o kontakt"
  }