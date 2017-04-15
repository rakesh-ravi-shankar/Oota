/**
 * Created by Rakesh on 4/15/17.
 */
var express = require('express');
var https = require('https');
var http  = require('http');
var fs = require('fs');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: "this is a secret",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var options = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem'),
    passphrase: 'oota'
};

var server = require('./serverconnection/app.js');
server(app);

https.createServer(options, app).listen(8443);
http.createServer(function (req, res) {
    site= req.headers['host'];
    site = site.split(':')[0];
    site=site+':8443';
    res.writeHead(301, { "Location": "https://" + site + req.url });
    res.end();
}).listen(8000);
