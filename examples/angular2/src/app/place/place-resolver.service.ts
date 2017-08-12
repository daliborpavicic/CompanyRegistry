import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import 'rxjs/add/operator/map';
import {PlaceService} from './shared/place.service';

@Injectable()
export class PlaceResolver implements Resolve<any> {
    constructor(private placeService: PlaceService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const placeId = route.params['id'];

        if (placeId) {
            return this.placeService.getPlace(placeId);
        }

        return PlaceService.getEmptyPlace();
    }
}
