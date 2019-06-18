"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
This is the entry point of the application. Express happens here.
**/
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
var puppeteer_1 = __importDefault(require("puppeteer"));
// formats the body of the request into what we want (JSON)
var body_parser_1 = __importDefault(require("body-parser"));
// response from server (node js) that means Starlite doesn't know how to respond
// this variable also appears in the speech.js file
var notACommand = "?notacommand?";
app.use(body_parser_1.default.json());
app.use(express_1.default.static(__dirname + "/../public")); // because it is run from inside the `build/` directory
console.log("DIRNAME: " + __dirname);
app.get("/", function (req, res) {
    return res.send("This is root. You should probably not get this b/c I set up a public dir.");
});
/**
 * Add any answers to post/get/etc requests from the client side here
 */
// USE PUPETTER TO RESPOND TO A POST WITH THE LINK TO YOUTUBE VIDEOS TO SCRAPE
app.post("/youtubeplay", function (req, res) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var url, browser, page, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = req.query.url;
                    console.log("URL: " + url);
                    return [4 /*yield*/, puppeteer_1.default.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            // get url of first video
                            var firstURL = document.querySelector("#dismissable #thumbnail").href; // this works.
                            return {
                                firstURL: firstURL
                            };
                        })];
                case 4:
                    doc = _a.sent();
                    console.log("FIRST URL: ", doc.firstURL);
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    res.json(doc);
                    return [2 /*return*/];
            }
        });
    }); })();
});
app.listen(port, function () { return console.log("Starlite JS listening on port " + port + "!"); });
/***
IDEA:

the backend selects which function to use from the actions.js stuff and then sends the function back to the client for
execution.


**/
