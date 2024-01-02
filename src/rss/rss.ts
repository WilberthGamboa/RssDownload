// Terceros
import Parser from 'rss-parser';


export default class Rss {
    constructor(
        private regex = /<img.*?src=["'](.*?)["']/
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
        if (feed) {

            for (const item of feed.items) {
                const match = item.content!.match(this.regex)
                match ? urlsImg.push(match[1]) : null;
            }
        }
        return urlsImg;
    }
}