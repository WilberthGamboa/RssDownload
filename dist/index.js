"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imgDownload_1 = __importDefault(require("./shared/imgDownload"));
const rss_1 = __importDefault(require("./rss/rss"));
const file_1 = __importDefault(require("./file/file"));
const regex_1 = __importDefault(require("./shared/utility/regex"));
const alert_1 = __importDefault(require("./alert/alert"));
class Main {
    rss;
    imgDownload;
    file;
    regex;
    alert;
    constructor() {
        this.rss = new rss_1.default();
        this.imgDownload = new imgDownload_1.default();
        this.file = new file_1.default();
        this.regex = new regex_1.default();
        this.alert = new alert_1.default();
    }
    async main() {
        this.alert.welcomeMessage();
        const urls = await this.file.readCsv();
        for (const result of urls) {
            for (const key in result) {
                const element = result[key];
                const feed = await this.rss.fetchRss(element);
                if (feed) {
                    if (feed.title) {
                        this.imgDownload.createFolder(this.regex.removeSpecialCharacters(feed.title));
                        const array = this.rss.getUrlImgToDownload(feed);
                        await this.imgDownload.downloadImg(array, this.regex.removeSpecialCharacters(feed.title));
                    }
                }
            }
        }
    }
}
const main = new Main();
main.main();
