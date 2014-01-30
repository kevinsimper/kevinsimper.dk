# Angular.js on Jekyll with Curly Braces
I was trying to add Angular.js to the craftyjs.com webpage, but could not get it to work. First i thought it was because i was not doing it wrong, because I was just starting to learn about Angular.js with all this curly braces and brackets.

The problem was the module Twig, which also uses the {{}} (curly braces), so when so see the HTML they are already gone. The solution is to use something else, but to do that you have to tell Angular.js that you do that.

<script src="https://gist.github.com/kevinsimper/6387442.js"></script>