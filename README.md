# NEWEL – demowebbplats

Statisk demo (ren HTML, inga byggsteg) av nya newel.se. Sidor: startsida, BRF och samfälligheter,
fastighetsbolag, företag, laddbox, IMD, supportavtal, offertförfrågan, intresseanmälan,
felanmälan, kontakt, kundcase och nyheter.

- Engelsk version ligger i `en/` (samma filnamn som de svenska sidorna). Språkbyte via länken *English* / *Svenska* i sidhuvudet. Bildplatshållare och sidtitlar är översatta; sidnamn som Felanmälan och Intresseanmälan har engelska motsvarigheter.
- **Variant B (förenklad struktur)** ligger i `v2/` (svenska) och `v2/en/` (engelska): 5 menyval, 3 formulär, kortare startsida. Jämför med originalet i rotmappen.
- Platshållare i hakparentes, t.ex. `[KUNDCITAT]`, ska ersättas med riktigt innehåll och riktiga bilder.
- Formulären skickar inget i demon (`assets/demo.js` visar bara ett tack-meddelande).
- Medlems- och partnerloggor hämtas direkt från newel.se. Kopiera dem till `assets/` före lansering.
- Alla sidor har `noindex` så att demon inte hamnar i Google. Ta bort raden `<meta name="robots" ...>` vid lansering.

## Publicera på GitHub Pages

1. Skapa ett repository och ladda upp alla filer i mappen (även `assets/` och `.nojekyll`).
2. Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, mapp `/ (root)` → Save.
3. Efter en–två minuter ligger sajten på `https://<konto>.github.io/<repo>/`.
