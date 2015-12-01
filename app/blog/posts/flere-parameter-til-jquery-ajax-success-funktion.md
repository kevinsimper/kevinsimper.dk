# Flere parameter til jQuery Ajax success funktion
Nogen gange har du brug for at give flere funktioner til et callback, som f.eks. jQuery Ajax funktionen. Problemet er bare at $.ajax().success(function(data){}), kun tager et parameter til callback.
Du kan løse det her problem ved at lave en funktion som retunere en funktionen med det forventede parameter.

<script src="https://gist.github.com/kevinsimper/05da1722d12f793f0976.js"></script>