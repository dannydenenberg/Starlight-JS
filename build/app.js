"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
var parser = require("body-parser");
app.use(parser.json());
app.use(express.static(__dirname + '/../public'));
console.log("DIRNAME: " + __dirname);
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.get('/cool', function (req, res) {
    res.send('Cool!');
});
app.post('/submitCommand', function (req, res) {
    var request = req.body;
    console.log(request);
    console.log(request.text);
    res.send({
        response: "Your response is this."
    });
});
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
