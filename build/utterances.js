"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// // this map contains the phrase or keyword that maps to a value which represents a function in the actions object
var Utterances = /** @class */ (function () {
    /** Populate the utterances map with the key/value pairs in the utterances.list file **/
    function Utterances() {
        // this map contains the phrase or keyword that maps to a value which represents a function in the actions object
        this.utterances = new Map();
        // syncronous reading. NOT OPTIMAL
        var data = fs_1.default.readFileSync(__dirname + "/utterances.list", "utf-8");
        console.log("IN utterances: \n", data); // works
        var lines = data.split("\n");
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var first = line.split("=")[0];
            var second = line.split("=")[1];
            this.utterances.set(first, second);
        }
    }
    return Utterances;
}());
// this map contains the phrase or keyword that maps to a value which represents a function in the actions object
/** get the info from the utterances.list file to populate the `utterances` variable **/
exports.default = Utterances;
