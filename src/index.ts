import ImgDownload from "./shared/imgDownload";
import Rss from "./rss/rss";

console.log('xd')


const main = async () =>{
    const rss = new Rss();
    const imgDownload = new ImgDownload();
   const feed = await rss.fetchRss('https://www.reddit.com/r/Ubuntu/.rss');
   console.log(feed?.title)
    if (feed) {
        if (feed.title) {
            imgDownload.folderSaveImgRss(feed.title);
                const array = rss.getUrlImgToDownload(feed)
        await imgDownload.downloadImg(  array,feed.title)
        }
    
 
    }
}

main()
