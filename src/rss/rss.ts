// Terceros
import Parser from 'rss-parser';
import Regex from '../shared/utility/regex';


export default class Rss {
    constructor(
        private regex = new Regex()
    ) { }
    async fetchRss(urlRss: string) {
        try {
            const parser = new Parser();
            const feed = await parser.parseURL(urlRss);
            return feed;
        } catch (error: any) {
            console.log(`Hubo un problema al procesar: ${urlRss}, mensaje: ${error.message}`)
        }
    }
    getUrlImgToDownload(feed: { [key: string]: any; } & Parser.Output<{ [key: string]: any; }>): string[] {
        const urlsImg = [];
        if (feed.items) {
            for (const item of feed.items) {
                if (item.content){
                    const urlFilter = this.regex.filterSrc(item.content);
                    if (urlFilter) urlsImg.push(urlFilter);
                }
            }
        }
        return urlsImg;
    }
}