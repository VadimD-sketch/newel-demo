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

## Senaste ändringar (19 nov 2026)

- Ny hero-bild (montör som monterar laddbox), kvinnor på bilderna för Privatperson och BRF samt ny Partners-sektion på startsidan utan separat Zpark-block.
- Om NEWEL: intro, *Varför välja NEWEL?* (4 punkter med ikoner) och *Partners* (Zpark först, medlemskap, bidrag och partnerformulär). Texterna är lorem ipsum tills riktigt innehåll finns.
- Förenklade formulär (offert, intresseanmälan, kontakt): namn, telefon eller e-post och ett meddelande. Felanmälan är oförändrad.
- Nytt omdömesformulär för slutkunder: `omdome.html` (EN: `en/omdome.html`) och utskriftsbart QR-kort `omdome-kort.html`. QR-koden pekar på föreslagna adresserna `newel.se/omdome` och `newel.se/en/review`.
- Länk till Partners i sidfoten på alla sidor.
- Bidragsinformationen är anpassad per målgrupp (BRF, företag, privatpersoner) och bygger på Naturvårdsverkets Ladda bilen och Skatteverkets Grön teknik-avdrag (kontrollerat nov 2026). Partners ligger på Om NEWEL, inte på startsidan.
- Steg-sektionen (fem steg) är kompakt och har orange samtalsband över hela bredden. Den ligger längst ned på tjänstesidorna, kundcase och startsidan. Rubrikerna har inte längre grå bakgrund.
- Startsidan: tjänsteraden (Laddning, IMD, Supportavtal, LED) ligger överst och är klickbar, kundcase ligger under *Varför välja NEWEL?*, bidragsinformation finns bredvid offertformuläret och femstegssektionen är borttagen. Sidan *Laddning* har en ny sektion om bidrag.
- Ny sida för målgruppen Privatperson / Villa (`privat.html`, EN: `en/privat.html`) så att alla fyra målgruppskort på startsidan har en egen sida. Menyval och sidfotslänk har lagts till (inte i Variant B). BRF-sidan använder nu samma foto som sitt kort.

## Publicera på GitHub Pages

1. Skapa ett repository och ladda upp alla filer i mappen (även `assets/` och `.nojekyll`).
2. Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, mapp `/ (root)` → Save.
3. Efter en–två minuter ligger sajten på `https://<konto>.github.io/<repo>/`.
