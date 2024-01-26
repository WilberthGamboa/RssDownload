"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
const rss_parser_1 = __importDefault(require("rss-parser"));
const regex_1 = __importDefault(require("../shared/utility/regex"));
class Rss {
    regex;
    constructor(regex = new regex_1.default()) {
        this.regex = regex;
    }
    async fetchRss(urlRss) {
        try {
            const parser = new rss_parser_1.default();
            const feed = await parser.parseURL(urlRss);
            return feed;
        }
        catch (error) {
            console.log(`Hubo un problema al procesar: ${urlRss}, mensaje: ${error.message}`);
        }
    }
    getUrlImgToDownload(feed) {
        const urlsImg = [];
        if (feed.items) {
            for (const item of feed.items) {
                if (item.content) {
                    const urlFilter = this.regex.filterSrc(item.content);
                    if (urlFilter)
                        urlsImg.push(urlFilter);
                }
            }
        }
        return urlsImg;
    }
}
exports.default = Rss;
