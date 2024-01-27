import * as fs from 'node:fs';
import csv from 'csv-parser';

export default class File {
    constructor() {}

    async readCsv(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const url: any[] = [];
            const stream = fs.createReadStream('rss.csv');
            stream
                .pipe(csv({ separator: ',', headers: false }))
                .on('data', (data: any) => {
                    url.push(data);
                })
                .on('end', () => {
                    resolve(url);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
}
