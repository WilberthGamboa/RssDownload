"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Regex {
    regexSpecialCharacters;
    regexSrc;
    constructor(regexSpecialCharacters = /[a-zA-Z\d]/g, regexSrc = /<img.*?src=["'](.*?)["']/) {
        this.regexSpecialCharacters = regexSpecialCharacters;
        this.regexSrc = regexSrc;
    }
    removeSpecialCharacters(text) {
        const parsedText = text.match(this.regexSpecialCharacters);
        const filteredText = parsedText ? parsedText.join('') : '';
        return filteredText;
    }
    filterSrc(text) {
        const match = text.match(this.regexSrc);
        if (match)
            return match[1];
    }
}
exports.default = Regex;
