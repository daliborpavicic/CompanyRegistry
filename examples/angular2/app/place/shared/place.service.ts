import { Injectable } from '@angular/core';

@Injectable() // this isn't required, but it's a good practice when service injects other services as it's deps
export class PlaceService {
    getPlaces() {
        return PLACES;
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