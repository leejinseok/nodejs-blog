var express = require('express');
var routes = require('./routes/');
var app = express();

app.set('port', '2080');
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(app.get('port'), function(){
	console.log('Server is running at %s', app.get('port'));
})
