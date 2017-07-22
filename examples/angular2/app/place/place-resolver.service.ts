import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {PlaceService} from "./shared/place.service";
import "rxjs/add/operator/map";

@Injectable()
export class PlaceResolver implements Resolve<any> {
    constructor(private placeService: PlaceService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        const placeId = route.params['id'];

        if (placeId) {
            return this.placeService.getPlace(placeId);
        }

        return {
            _id: '',
            postalCode: '',
            name: '',
        };
    }
}