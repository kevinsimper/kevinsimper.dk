# OS X Case insentive fil system og Git
OS X, også bare Mac, kører med det som hedder Case in-sentitive. Det vil sige at filsystemet er ligeglad med om filerne er store eller små, det er stadig den samme fil.

Problemet er bare at på andre styresystemer som Unix køres der med case sentitive, det vil sige at der er stor forskel på store og små bogstaver.

Det kan meget nemt blive et problem hvis du udvikler på en mac og din server er en unix.

Git honorer meget flinkt OSX med også at være case in-sentitive, men det kan være en rigtig god ide at slå det fra, så slipper du for en hel masse bølv!

git config core.ignorecase false

Skriv det i terminalen og så sætter git selv den indstilling.