# NEWEL – demowebbplats

Statisk demo (ren HTML, inga byggsteg) av nya newel.se. Sidor: startsida, BRF och samfälligheter,
fastighetsägare, företag, laddbox, IMD, supportavtal, offertförfrågan, intresseanmälan,
serviceanmälan, kontakt, referenser och nyheter.

- Platshållare i hakparentes, t.ex. `[KUNDCITAT]`, ska ersättas med riktigt innehåll och riktiga bilder.
- Formulären skickar inget i demon (`assets/demo.js` visar bara ett tack-meddelande).
- Medlems- och partnerloggor hämtas direkt från newel.se. Kopiera dem till `assets/` före lansering.
- Alla sidor har `noindex` så att demon inte hamnar i Google. Ta bort raden `<meta name="robots" ...>` vid lansering.

## Publicera på GitHub Pages

1. Skapa ett repository och ladda upp alla filer i mappen (även `assets/` och `.nojekyll`).
2. Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, mapp `/ (root)` → Save.
3. Efter en–två minuter ligger sajten på `https://<konto>.github.io/<repo>/`.
