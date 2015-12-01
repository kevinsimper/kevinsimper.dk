# Mit nyeste projekt: Opsamling af det mest populærer musik

![](http://kevinsimper.dk/wp-content/uploads/2011/11/partychart1.jpg "partychart")

Jeg kan godt lide at hører musik, men tit så synes det kan være besværligt at opdage nye numre. Jeg hører ofte et nyt nummer som jeg godt kan lide, men glemmer navnet ligeså hurtigt som jeg har hørt det (jeg er ufattelig dårligt til at huske navne - #1 ting jeg skal blive bedre til).

Der findes en liste som samler de mest spillede sange på dansegulvet, den hedder [dancechart](http://djz.dk/dancechart), og jeg synes de gør et godt arbejde, desværre er det alt for besværligt at hører de forskellige. Du skal enten selv sidde og taste navnet ind i youtube eller finde dem på [Wimp](http://wimp.dk/wweb/index/) eller [TDC Play](http://musik.tdconline.dk/).
Det er alt for besværligt, og især når der er 50 sange på listen!

Jeg har lavet en hjemmeside som gør det nemt at se hele dancechart, og samtidig se musikvideoen som hører til. Jeg har kaldt siden [Partychart](http://partychart.dk).dk.

### Kort fortalt hvordan siden fungere

Siden fungere på den måde at den først [henter og læser](http://developer.yahoo.com/yql/) hele dancechart toplisten en efter en. Derefter søger den på Youtube med deres [API](http://code.google.com/apis/youtube/2.0/developers_guide_json.html), efter en video som passer til. Så bliver sangens navn, kunstner, placering på listen, og linket til Youtube gemt i en database. Derefter bliver data'erne hentet ud på [partychart.dk](http://partychart.dk) og præsenteret med [Youtube's Player API](http://www.tikku.com/jquery-youtube-tubeplayer-plugin). Dette gør at siden automastik kan hente den næste video når den nuværende video løber ud. Siden får også hjælp af [jQuery](http://jquery.com/), som er det der hedder javascript, til at ændre i siden så den ikke behøves at genindlæses hele tiden.

Andre ting jeg har brugt; Sådan så tingene følge med skærmen når du scroller - [Forrst Sap](https://github.com/Forrst/sap) på Github.

Alt dette sker automatisk hver uge når dancechart bliver opdateret, som sker ugeligt.