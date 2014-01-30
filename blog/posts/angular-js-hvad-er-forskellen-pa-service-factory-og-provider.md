# Angular.js - Hvad er forskellen på Service, Factory og Provider?
Når man starter på Angular.js, går man virkelig ind i et fuldblods framework modsat så mange andre JavaScript biblioteker. Man støder dog hurtigt på noget som hedder Service, Factory og Provider, som umiddelbart tilbyder det sammen, men det er ikke hel klart hvad forskellen reelt er.

Men her er det meget kort:

*   Service
Den simpleste måde at lave funktion som kan returnere data. Denne kan du bruge i de fleste tilfælde
*   Factory
Mere advanceret en Service. Her retunere du et object med functionerne som du vil tilbyde. Det betyder at du kan have skjule functioner, som ikke kan tilgåes udefra.
*   Provider
Den tungeste af de 3 funktioner. Provider er lavet til at man også kan lave config-indstillinger.

<script src="https://gist.github.com/Mithrandir0x/3639232.js"></script>