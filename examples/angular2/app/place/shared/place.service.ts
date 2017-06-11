import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable() // this isn't required, but it's a good practice when service injects other services as it's deps
export class PlaceService {
    getPlaces() {
        const subject = new Subject();
        setTimeout(() => {
            subject.next(PLACES);
            subject.complete();
        }, 100);

        return subject;
    }

    getPlace(id:string) {
        return PLACES.find(place => place.id === id);
    }
}

const PLACES = [
    {"id": "21000", "zipCode": "21000", "name": "Novi Sad"},
    {"id": "11000", "zipCode": "11000", "name": "Beograd"},
    {"id": "24000", "zipCode": "24000", "name": "Subotica"},
    {"id": "34000", "zipCode": "34000", "name": "Kragujevac"},
    {"id": "22000", "zipCode": "22000", "name": "Sremska Mitrovica"},
    {"id": "31000", "zipCode": "31000", "name": "Užice"}
];