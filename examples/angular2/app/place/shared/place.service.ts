import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {IPlace} from "./place.model";

@Injectable() // this isn't required, but it's a good practice when service injects other services as it's deps
export class PlaceService {

    getPlaces():Observable<IPlace[]> {
        const subject = new Subject<IPlace[]>();
        setTimeout(() => {
            subject.next(PLACES);
            subject.complete();
        }, 10);

        return subject;
    }

    getPlace(id:string) {
        return PLACES.find(place => place.id === id);
    }

    addPlace(zipCode:string, name:string) {
        const id = "1";
        PLACES.push({ id, zipCode, name });
    }
}

const PLACES:IPlace[] = [
    {"id": "21000", "zipCode": "21000", "name": "Novi Sad"},
    {"id": "11000", "zipCode": "11000", "name": "Beograd"},
    {"id": "24000", "zipCode": "24000", "name": "Subotica"},
    {"id": "34000", "zipCode": "34000", "name": "Kragujevac"},
    {"id": "22000", "zipCode": "22000", "name": "Sremska Mitrovica"},
    {"id": "31000", "zipCode": "31000", "name": "Užice"}
];