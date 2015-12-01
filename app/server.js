var express = require('express');
var harp = require('harp');
var app = express();

app.use(express.static(process.cwd() + '/public'));
app.use(harp.mount(__dirname + '/blog'));

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
