# Nem måde at levere minified JavaScript i produktion...
Nem måde at levere minified JavaScript i produktion og normalt Javascript i development.

if (process.env.MODE === "production") {
  app.use(express['static'](__dirname + '/min'));
} else {
  app.use(express['static'](__dirname + '/normal'));
}

Ellers vil jeg også anbefale at se på Piler, som er et Asset Manager for Node.js
https://github.com/epeli/piler