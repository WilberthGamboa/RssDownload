import Parser from 'rss-parser'
import sizeof from 'image-size'
const parser = new Parser();
import axios from 'axios';
import * as fs from 'node:fs';
import * as path from 'path'
import  {spawn} from 'node:child_process'




const main = async () =>{
    const feed = await parser.parseURL('https://www.xataka.com/feedburner.xml')
    console.log(feed.image)
    for (const iterator of feed.items) {
        const x = iterator.content!.toString();
        const regex = /<img.*?src=["'](.*?)["']/;
        const match = x.match(regex);
        const src = match ? match[1] : null;
       if (src) {
        const response = await axios.get(src,{ responseType: 'arraybuffer' });
       const propiedades = sizeof(response.data);
       fs.writeFileSync('imagen_procesada.jpg', response.data);
       
        
       }
        
        
    }
}

main()
