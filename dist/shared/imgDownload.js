"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Nodejs imports
const fs = __importStar(require("node:fs"));
const path = __importStar(require("path"));
//Terceros
const axios_1 = __importDefault(require("axios"));
const image_size_1 = __importDefault(require("image-size"));
const uuid_1 = require("uuid");
const alert_1 = __importDefault(require("../alert/alert"));
class ImgDownload {
    alert;
    constructor() {
        this.alert = new alert_1.default();
    }
    async downloadImg(urlsImg, folderRss) {
        this.alert.rssTitleMessageStart('Se está descargando: ' + folderRss);
        for (const urlImg of urlsImg) {
            const response = await axios_1.default.get(urlImg, { responseType: 'arraybuffer' });
            const propiedades = (0, image_size_1.default)(response.data);
            fs.writeFileSync(path.join('img', folderRss, (0, uuid_1.v4)() + '.' + propiedades.type), response.data);
        }
        this.alert.rssTitleMessageEnd('Se descargó: ' + folderRss);
    }
    async createFolder(nombreCarpeta) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'img', nombreCarpeta))) {
            // Si no existe, crear la carpeta
            fs.mkdirSync(path.join(__dirname, '..', '..', 'img', nombreCarpeta));
            console.log(`La carpeta '${nombreCarpeta}' ha sido creada.`);
        }
        else {
            console.log(`La carpeta '${nombreCarpeta}' ya existe.`);
        }
    }
}
exports.default = ImgDownload;
