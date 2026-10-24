# Köksplanen

Familjens gemensamma handlingslista, veckomeny och rättdatabas. En statisk webbapp (PWA) som hostas på GitHub Pages och synkar i realtid via Firebase Firestore. Inloggning sker med Google, och bara adresserna i `firestore.rules` kommer åt datan.

## Filer
- `index.html` – hela appen
- `config.js` – Firebase-konfigurationen för webbappen
- `seed.js` – starträtter som kan läggas in med en knapp under Rätter
- `firestore.rules` – vilka konton som får läsa och skriva
- `sw.js`, `manifest.webmanifest`, `icons/` – gör att appen kan läggas på hemskärmen och starta utan nät

## Uppsättning
1. Skapa ett Firebase-projekt. Slå på Firestore och Authentication med Google som inloggning.
2. Lägg till en webbapp i projektet och klistra in konfigurationen i `config.js`.
3. Ange era två e-postadresser i `firestore.rules` och klistra in reglerna under Firestore → Regler.
4. Lägg till `<användarnamn>.github.io` under Authentication → Settings → Authorized domains.
5. Slå på GitHub Pages för repot (Settings → Pages → Deploy from branch → main / root).

## Lägga på hemskärmen
- iPhone: öppna sidan i Safari → Dela → Lägg till på hemskärmen.
- Android: öppna sidan i Chrome → ⋮ → Installera appen / Lägg till på startskärmen.
