import ImgDownload from "./shared/imgDownload";
import Rss from "./rss/rss";
import figlet from 'figlet';
import * as fs from 'node:fs'
import csv from 'csv-parser'



const main = async () =>{
    const rss = new Rss();
    const imgDownload = new ImgDownload();
    let results: any[] = [];
     fs.createReadStream('rss.csv')
  .pipe(csv({ separator: ',',headers:false }))
  .on('data', (data:any) => {

    results.push(data)
 

    
})
  .on('end', async () => {

    figlet("RSS DOWNLOADER", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      });
    for (const result of results) {
        for (const key in result) {
           
                const element = result[key];
                 const feed = await rss.fetchRss(element);

     if (feed) {
         if (feed.title) {
             imgDownload.folderSaveImgRss(feed.title);
                 const array = rss.getUrlImgToDownload(feed)
         await imgDownload.downloadImg(  array,feed.title)
         }}
          
        }
    }
 
   
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });


  

//  for (const result of results[0]) {
   /*
    const feed = await rss.fetchRss(result);

    console.log(feed?.title)
     if (feed) {
         if (feed.title) {
             imgDownload.folderSaveImgRss(feed.title);
                 const array = rss.getUrlImgToDownload(feed)
         await imgDownload.downloadImg(  array,feed.title)
         }
     
  
  //   }
   
    
  }
  /*
    figlet("RSS DOWNLOAD", function (err, data) {
        if (err) {
          return;
        }
        console.log(data);
      });
 const feed = await rss.fetchRss('https://www.xataka.com/feedburner.xml');

   console.log(feed?.title)
    if (feed) {
        if (feed.title) {
            imgDownload.folderSaveImgRss(feed.title);
                const array = rss.getUrlImgToDownload(feed)
        await imgDownload.downloadImg(  array,feed.title)
        }
    
 
    }
  */
 
}

main()
