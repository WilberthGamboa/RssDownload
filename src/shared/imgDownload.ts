//Nodejs imports
import * as fs from 'node:fs';
import * as path from 'path';
//Terceros
import axios from 'axios';
import sizeof from 'image-size';
import { v4 as uuidv4 } from 'uuid';
import Alert from '../alert/alert';

export default class ImgDownload {
    private alert : Alert;
    constructor(){
        this.alert = new Alert();
    }
    async downloadImg(urlsImg:string[],folderRss:string){
        this.alert.rssTitleMessageStart('Se está descargando: '+ folderRss)
        for (const urlImg of urlsImg) {
            const response = await axios.get(urlImg, { responseType: 'arraybuffer' });
            const propiedades = sizeof(response.data);
            fs.writeFileSync(path.join('img',folderRss, uuidv4() + '.' + propiedades.type!), response.data);
        }
       this.alert.rssTitleMessageEnd('Se descargó: '+ folderRss)
    }

    async createFolder(nombreCarpeta:string){
        if (!fs.existsSync(path.join(__dirname,'..','..','img',nombreCarpeta))) {
            // Si no existe, crear la carpeta
            fs.mkdirSync(path.join(__dirname,'..','..','img',nombreCarpeta));
            console.log(`La carpeta '${nombreCarpeta}' ha sido creada.`);
        } else {
            console.log(`La carpeta '${nombreCarpeta}' ya existe.`);
        }
    }

}

