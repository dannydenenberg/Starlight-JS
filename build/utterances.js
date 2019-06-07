"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// // this map contains the phrase or keyword that maps to a value which represents a function in the actions object
// const utterances = new Map([
//   ["hey", "hello"],
//   ["hello", "hello"],
//   [""]
// ])
var Utterances = /** @class */ (function () {
    function Utterances() {
        this.utterances = new Map();
        fs_1.default.readFile(__dirname + "/utterances.list", 'utf-8', function (err, data) {
            if (err) {
                console.log("ERROR: ", err);
            }
            console.log(data);
        });
    }
    return Utterances;
}());
// this map contains the phrase or keyword that maps to a value which represents a function in the actions object
/** get the info from the utterances.list file to populate the `utterances` variable **/
exports.default = Utterances;
