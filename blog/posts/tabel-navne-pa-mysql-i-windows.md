# Tabel navne på MySQL i Windows
Det er typisk at man udvikler på en Windows maskine og bagefter lægger sin applikation ud på en linux server. Der er dog en opsætning som få dig til at undre dig en del.

Det er nemlig sådan at MySQL har som standard sat til at kun bruge lowercase bogstaver (små bogstaver). Så hvis du laver denne forespørgsel:
<pre  lang="SQL">CREATE TABLE `Artikler` (
`id` int(11) NOT NULL,
`tekst` text NOT NULL
)</pre>
Så MySQL lave tabellen men den vil blive oprette som `artikler.`

Der er en indstilling i MySQL som definere dette,** `lower_case_table_names.`**

Jeg vil dog anbefale at man bare holder alle tabel navne med lowercase, så undgår du helt den problematik.