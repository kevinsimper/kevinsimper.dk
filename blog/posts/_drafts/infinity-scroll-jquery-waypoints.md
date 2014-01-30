# Infinity Scroll med jQuery Waypoints
En måde du kan lave infinity scroll, lidt ligesom det du kender fra Facebook og Twitter, er ved at bruge jQuery Waypoints. Det er et script kan bruges til mange forskellige ting, men det den gør er at opsætte punkter ud fra forskellige indstillinger.

## Eksempel

Først der starte vi med at inkludere de scripts vi gerne vil bruge.
Det bliver jQuery, Waypoints og Handlebars, som skal bruges til at lave render de enkelte tweets.
<pre>&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="http://cdnjs.cloudflare.com/ajax/libs/waypoints/1.1.6/waypoints.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.2/handlebars.min.js"&gt;&lt;/script&gt;</pre>
Det første vi gør er at hente de tweets fra twitter som vi skal bruge via Ajax. Vi kan for eksempel bruge en søgning på "nyhed", og se hvad de giver.
JQuery har en funktion som hedder $.ajax som nemt kan hente det for os!
<pre>$.ajax({url: 'http://search.twitter.com/search.json?q=nyhed&amp;rpp=20&amp;include_entities=true&amp;result_type=mixed&amp;lang=da', dataType: 'JSONP'});</pre>
Vi bruger indstillingen  `dataType: 'JSONP'` på grund af Access-Control-Allow-Origin som gør at man normalt ikke kan hente data på tværs af domæner, men ved at bruge JSONP kan man få twitter til at putte det ind i en kodeblok. Læs mere om det her på wikipedia: [Same Origin Policy](http://en.wikipedia.org/wiki/Same_origin_policy "Same Origin Policy")

## Template med Handlebars

Nu har vi fået fat i dataerne. Nu laver vi en simpel template med Handlebars.
<pre>&lt;script id="tweet-template" type="text/x-handlebars-template"&gt;
  &lt;div class="tweet"&gt;
    &lt;div class="text"&gt;{{text}}&lt;/div&gt;
    &lt;div class="user"&gt;@{{from_user}}&lt;/div&gt;
  &lt;/div&gt;
&lt;/script&gt;</pre>
Ved at smide det ind i et `script` tag kan man få browseren til at springe koden over, men vi kan stadig få fat i koden med id'et.

Handlebars er en nem og overskuelig måde at lave en template, så du ikke behøves at søge og erstatte med jQuery. Måde man indsætter værdier med er ved `{{}}`.
Du kan se at jeg har indsat tags, hvor teksten og brugernavnet skal stå.

Så for at vi kan bruge skabelonen skal vi compile den til Javascript, og det gør vi ved først at hente HTML og derefter compile det med Handlebars.
<pre>var source = $('#tweet-template').html();
var template = Handlebars.compile(source);</pre>
Så er vi faktisk klart til at skrive templaten ud for de tweets vi har ventet via JSONP.
<pre>.success(function(data){

for(i = 0; i &lt; 20; i++){
var tweet = data.results.shift();
var html = template(tweet);
$('#app').append(html);
}

});</pre>
Så ser vores resultat ud som det her indtil videre:
[http://jsbin.com/ofocuj/1/edit](http://jsbin.com/ofocuj/1/edit)

## Lidt CSS Styling

<pre>.tweet {
margin: 20px 15px;
}
.tweet .text {
padding: 10px;
background: #e0f7fd;
border-radius: 4px;
}
.tweet .user {
text-align: right;
}</pre>
Så ser det lidt pænere ud:
[http://jsbin.com/ofocuj/4/edit](http://jsbin.com/ofocuj/4/edit)

## Infinity Scroll af nye tweets