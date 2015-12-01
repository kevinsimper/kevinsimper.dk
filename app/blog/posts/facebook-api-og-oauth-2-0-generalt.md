# Facebook API og OAuth 2.0 Generalt
Jeg har prøvet at sætte mig ind i OAuth 2.0 og det er ganske fornuftigt, der er dog nogle ting man lige skal læse for at forstå konceptet.

En god hjemmeside som forklarer Oauth 2.0 generalt er den her:
http://aaronparecki.com/articles/2012/07/29/1/oauth2-simplified
Her kan du klikke og læse de forskellige request som kan foregå.

En meget gennemgående manuel og som også svarer på forskellige problemer kan du læse her:
http://tools.ietf.org/html/draft-ietf-oauth-v2-threatmodel-08

Når du bruger Facebook API og undre dig over hvorfor du skal bruge "Authorization Code" istedet for bare at få en "Access Token", så er det fordi man prøver at undgå at flere får adgang til den Token.
En "Authorization Code" har nemlig en meget kort leve tid, så hvis man skulle komme i besiddelse af den ved f.eks. logs og browserhistorik er det ikke muligt at bruge den.
"Access Token" har derimod en meget længere levetid. Den er brugt steder hvor man ikke kan beskytte kildekoden, ved f.eks. JavaScript klienter.
OAuth 2.0 får du som udvikler nemlig et Client-id, som er offentligt faktisk og et App secret som ikke må deles. Ved JavaScipt er koden jo tilgændelig, så derfor bruger man ikke App Secret.

Når man så bytter Authorization Code til en Access Token er en af parameterne redirect_uri. Det kan man godt undre sig over hvorden den skal være med, når der i virkeligheden ikke er nogen som skal redirect'es. 
Det er fordi at første gang at brugeren blev redirectet var der et redirect_uri, hvis det så ikke er det samme senere er der nogen som har snydt.

F.eks. hvis nu at en ond person gør www.facebook.com/oauth/DITappId?redirect_uri=www.hacker.dk, så vil han ikke have held fordi facebook redirecter så til www.hacker.dk efter at brugeren er logget ind, men for at bytte til en access token, skal han bruge en godkendt URI. Alt sammen giver mening. Man skal bare ikke tror det er fordi der er nogen som skal redirectes, det er kun første gang, anden gang er til sikkerhedscheck.