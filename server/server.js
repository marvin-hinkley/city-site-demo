var express     = require('express'),
    app         = express(),
    http        = require('http'),
    bodyParser  = require('body-parser'),
    fs          = require('fs');

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

http.createServer(app).listen(3000, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendfile('../public/index.html');
});
