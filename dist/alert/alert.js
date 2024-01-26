"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const colors_1 = __importDefault(require("colors"));
class Alert {
    constructor() { }
    welcomeMessage() {
        (0, figlet_1.default)("RSS DOWNLOADER", function (err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            console.log(data);
        });
    }
    rssTitleMessageStart(title) {
        console.log(colors_1.default.red(title));
    }
    rssTitleMessageEnd(title) {
        console.log(colors_1.default.green(title));
    }
}
exports.default = Alert;
