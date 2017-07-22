import {Inject, Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {IPlace} from "./place.model";
import {MongoLabService} from "../../common/mongo-lab.service";

const collectionName = 'places';

@Injectable() // this isn't required, but it's a good practice when service injects other services as it's deps
export class PlaceService {

    constructor(private http: Http,
                private mongoLab: MongoLabService) {
    }

    // just calling getEvents will not trigger an HTTP request if nobody's subscribed
    getPlaces(): Observable<IPlace[]> {
        const url = this.mongoLab.getUrlForCollection(collectionName);

        return this.http.get(url)
            .map((response: Response) => <IPlace[]>response.json());
    }

    getPlace(id: string): Observable<IPlace> {
        const url = this.mongoLab.getUrlForEntity(collectionName, id);

        return this.http.get(url)
            .map((response: Response) => <IPlace>response.json());
    }

    createPlace(place: IPlace): Observable<IPlace> {
        const url = this.mongoLab.getUrlForCollection(collectionName);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers});

        return this.http.post(url, JSON.stringify(place), options)
            .map((response: Response) => {
                return response.json();
            });
    }

    updatePlace(place: IPlace): Observable<IPlace> {
        const url = this.mongoLab.getUrlForEntity(collectionName, place._id);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers});

        delete place._id; // do not override an existing _id in mongoLab

        return this.http.put(url, JSON.stringify(place), options)
            .map((response: Response) => {
                return response.json();
            });
    }

    deletePlace(id) {
        const url = this.mongoLab.getUrlForEntity(collectionName, id);

        this.http.delete(url).map((response: Response) => {
            console.log(response.json());
        }).subscribe(); // self-subscription to trigger the request when method is called
    }
}