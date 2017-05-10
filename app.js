// Basic express server for the /public folder

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(Number(process.env.PORT) || 8000, function () {
  console.log('App listening on port 8000!');
});
