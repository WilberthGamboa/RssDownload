import axios from 'axios';
import sizeof from 'image-size';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs';
import * as path from 'path';
export default class ImgDownload {
    constructor(){}
    async downloadImg(urlsImg:string[],folderRss:string){
        console.log(urlsImg)
        folderRss = folderRss.replace(/\s+/g, '');
        folderRss = folderRss.replace(':', '').replace('<', '').replace('>', '').replace('"', '').replace('/', '').replace('\\', '').replace('|', '').replace('?', '').replace('*', '')
        for (const urlImg of urlsImg) {
            const response = await axios.get(urlImg, { responseType: 'arraybuffer' });
            
            const propiedades = sizeof(response.data);
            console.log(propiedades)
            fs.writeFileSync(path.join('img',folderRss, uuidv4() + '.' + propiedades.type!), response.data);
            console.log(path.join('img',folderRss, uuidv4() + '.' + propiedades.type!), response.data)
        }
    }

    async folderSaveImgRss(nombreCarpeta:string){
        nombreCarpeta = nombreCarpeta.replace(/\s+/g, '');
        nombreCarpeta = nombreCarpeta.replace(':', '').replace('<', '').replace('>', '').replace('"', '').replace('/', '').replace('\\', '').replace('|', '').replace('?', '').replace('*', '')

        
        if (!fs.existsSync(path.join(__dirname,'..','..','img',nombreCarpeta))) {
            // Si no existe, crear la carpeta
            fs.mkdirSync(path.join(__dirname,'..','..','img',nombreCarpeta));
            console.log(`La carpeta '${nombreCarpeta}' ha sido creada.`);
        } else {
            console.log(`La carpeta '${nombreCarpeta}' ya existe.`);
        }
    }

}

