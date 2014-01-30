# Hvis du skal finde et program i terminal...
Hvis du skal finde et program i terminal:
`ps aux` eller for en interaktiv version `top`

Vil du søge i listen kan du skrive `ps aux | grep spotify`

Ved at lave en "|" siger du at den skal tage outputtet fra den første kommando og give det til den næste kommando. `grep` er en simpel funktion som søger og retunere de linjer hvor ordet du har skrevet fremgår.

Du kan så se i anden kolonnen i terminal på mac når du skriver `ps aux` selve "id'et" (også kaldet pid) på programmet. Hvis du gerne vil lukke det program fordi det er gået i stå kan du skive `kill pid` hvor pid er det id på programmet.