var express = require('express');

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

// app.get('/', function(req, res){
// 	res.render('index'); 
// });

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 1336;

app.listen(port, function(){
	console.log('http://127.0.0.1:' + port + '/');
});
