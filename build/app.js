"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
var body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(__dirname + '/../public'));
console.log("DIRNAME: " + __dirname);
app.get('/', function (req, res) { return res.send('This is root. You should probably not get this b/c I set up a public dir.'); });
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
