# De bedste steder at hoste din webapp med en PaaS
Der findes mange måder at hoste en webapp. Du kan bruge Amazon aws, hvor du selv kan sætte din egen virtuelle maskine op, men så skal du også tænke på en hel masse ting, som

*   backup
*   load balacing
*   skalering
*   opsætning
*   opdatering
Altså en hel masse ting som er nødvendige, men som ikke gør at du får udviklet din webapp til at blive bedre! Der findes derfor nogle firmaer som prøver at løses netop det problem for dig også kaldet PaaS, Platform-as-a-Service.

De har efterhånden nogle år på bagen og der også kommet flere efterhånden. Den mest kendte PaaS er nok Heroku.

## **Heroku**

![heroku-logo-light-234x60](http://kevinsimper.dk/wp-content/uploads/2013/02/heroku-logo-light-234x60.png)
[http://www.heroku.com/](http://www.heroku.com/ "Heroku")

Heroku er uden tvivl den mest avanceret PaaS der er på markedet. De har et rigtig aktivt community og med deres Addons står de meget stærkt, MEN de har kun deres datacenter i USA på vestkysten, så hvis du er i Europa vil du opleve lidt ekstra Latency. Der har været snakket om at det vil komme til Europa, men der er ikke kommet noget nyt om det.
Heroku kører med det som hedder Dyno, som er 1 virtuel maskine med 512 MB ram og du får lov til at få 1 gratis dyno til hver af dine apps til at starte med. Bliver din app så mere populær kan du købe flere dyno'er til $35 stykket.

+ Ubegrænset oprettelse af Apps
+ Bruger Git til deploy
+ Masser af Addons
- Findes ikke i Europa
- Har ikke MySql som standard (kun Postgres, MySql kan fås fra 3rd Addon)

## **AppFog**

![AppFog-logo](http://kevinsimper.dk/wp-content/uploads/2013/02/AppFog-logo.png)
[https://www.appfog.com/](https://www.appfog.com/ "Appfog")

Appfog er en anden seriøs PaaS som er godt påvej. De er stadig under udvikling og har ikke ligeså mange funktioner som Heroku. Du har dog selv muligheden for at vælge hvilket datacenter du vil bruge, så for os i Danmark kan vil vælge Ireland som ligger rimelig tæt. Deres koncept er meget simpelt og er modsat Heroku målt i ram, så som gratis bruger får du 2 GB ram gratis som du kan fordele ud over forskellige apps som du selv laver. Det vil sige at du faktisk har muligheden for at lave flere instances og faktisk få bedre performance end du ville få hos Heroku helt gratis.

+ Får hele 2 GB ram som du selv kan fordele
+ Europæisk datacenter
+ MySql
- Lidt sværere at regne ud først
- Bruger ikke git til deploy, bare CLI

## **Andre nævneværdige PaaS**

### Nodejitsu

![nodejitsu](http://kevinsimper.dk/wp-content/uploads/2013/02/nodejitsu.png)
[http://nodejitsu.com/](http://nodejitsu.com/ "Nodejitsu")

Kun Node.js hosting, men super intuitivt og meget fordelagtige priser. Dog er der kun en 30 dages trial, så ikke nogen freebies her.

### AWS Elastic Beanstalk

![aws](http://kevinsimper.dk/wp-content/uploads/2013/03/aws.png)
[http://aws.amazon.com/elasticbeanstalk/](http://aws.amazon.com/elasticbeanstalk/ "AWS Elastic Beanstalk")

Amazons svar på Heroku, dog meget mere simpelt og ikke så mange muligheder. Du kan ikke bruge Node.js, men næsten alle andre.

### Google App Engine

![google-app-engine](http://kevinsimper.dk/wp-content/uploads/2013/02/google-app-engine.png)
[https://developers.google.com/appengine/](https://developers.google.com/appengine/)

Google har også lavet en seriøs PaaS, hvor det er muligt at hoste sin app gratis. Du kan dog kun bruge Python, Java eller Go.

&nbsp;