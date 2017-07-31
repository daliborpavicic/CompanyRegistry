import {Injectable} from '@angular/core';

const BASE_URL = 'https://api.mongolab.com/api/1/databases/angulardb/collections';
const API_KEY = 'ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw';

@Injectable()
export class MongoLabService {
    getUrlForCollection(collectionName: string) {
        return `${BASE_URL}/${collectionName}?apiKey=${API_KEY}`;
    }

    getUrlForEntity(collectionName: string, id: string) {
        return `${BASE_URL}/${collectionName}/${id}?apiKey=${API_KEY}`;
    }
}
