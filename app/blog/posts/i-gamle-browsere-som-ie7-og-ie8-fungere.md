# I gamle browsere som IE7 og IE8 fungere...
I gamle browsere som IE7 og IE8 fungere z-indes lidt anderledes end i moderne browsere. Selv om du har sat et højt z-index på et element, og der er et element højere oppe der har et lavere z-index, vil det element flyde oven på, selvom dens z-index er lavere.

Du er derfor nød til at få de to elementer (div's f.eks.) på det samme niveau i html dokumentet før at de kan konkurrerer om z-index.

<script src="https://gist.github.com/kevinsimper/5966487.js"></script>