import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {PlaceService} from "./shared/place.service";
import "rxjs/add/operator/map";

@Injectable()
export class PlaceListResolver implements Resolve<any> {
    constructor(private placeService:PlaceService) {

    }

    resolve() {
        return this.placeService.getPlaces().map(places => places);
    }
}