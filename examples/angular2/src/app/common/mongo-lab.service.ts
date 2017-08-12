import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

const BASE_URL = 'https://api.mongolab.com/api/1/databases/angulardb/collections';
const API_KEY = 'ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw';

@Injectable() // this isn't required, but it's a good practice when service injects other services as it's deps
export class MongoLabService {
  constructor(private http: Http) {
  }

  // just calling getEntities will not trigger an HTTP request if nobody's subscribed
  getEntities(collectionName: string) {
    return this.http.get(getUrlForCollection(collectionName))
      .map((response: Response) => response.json());
  }

  getEntity(collectionName: string, entityId: string) {
    return this.http.get(getUrlForEntity(collectionName, entityId))
      .map((response: Response) => response.json());
  }

  createEntity(collectionName: string, entityData) {
    return this.http.post(
      getUrlForCollection(collectionName),
      JSON.stringify(entityData),
      createRequestOptions()
    ).map((response: Response) => {
      return response.json();
    });
  }

  updateEntity(collectionName: string, entityData) {
    delete entityData._id; // do not override an existing _id in mongoLab

    return this.http.put(
      getUrlForCollection(collectionName),
      JSON.stringify(entityData),
      createRequestOptions()
    ).map((response: Response) => {
      return response.json();
    });
  }

  deleteEntity(collectionName: string, id: string) {
    return this.http.delete(getUrlForEntity(collectionName, id))
      .map((response: Response) => {
        return response.json();
      });
  }
}

function getUrlForCollection(collectionName: string) {
  return `${BASE_URL}/${collectionName}?apiKey=${API_KEY}`;
}

function getUrlForEntity(collectionName: string, id: string) {
  return `${BASE_URL}/${collectionName}/${id}?apiKey=${API_KEY}`;
}

function createRequestOptions() {
  const headers = new Headers({'Content-Type': 'application/json'});

  return new RequestOptions({headers});
}
