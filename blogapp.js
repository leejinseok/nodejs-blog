var path = require('path');
var express = require('express');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var app = express();

app.set('port', '2080');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploaded', express.static(path.join(__dirname, 'uploaded')));
app.use('/', routes);

app.listen(app.get('port'), function(){
	console.log('Server is running at %s', app.get('port'));
})
