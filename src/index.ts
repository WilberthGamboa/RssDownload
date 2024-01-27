import ImgDownload from './shared/imgDownload';
import Rss from "./rss/rss";
import File from "./file/file";
import Regex from './shared/utility/regex';
import Alert from './alert/alert';

class Main {
  private rss: Rss;
  private imgDownload: ImgDownload;
  private file: File;
  private regex: Regex;
  private alert: Alert;
  constructor() {
    this.rss = new Rss();
    this.imgDownload = new ImgDownload();
    this.file = new File();
    this.regex = new Regex();
    this.alert = new Alert()
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
            const array = this.rss.getUrlImgToDownload(feed)
            await this.imgDownload.downloadImg(array, this.regex.removeSpecialCharacters(feed.title));
          }
        }
      }
    }

  }

}

const main = new Main();
main.main()
