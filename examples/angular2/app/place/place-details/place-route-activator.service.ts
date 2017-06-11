import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {PlaceService} from "../shared/place.service";

@Injectable()
export class PlaceRouteActivator implements CanActivate {
    constructor(
        private placeService:PlaceService,
        private router:Router
    ) {

    }

    canActivate(route:ActivatedRouteSnapshot) {
        const placeExists = !!this.placeService.getPlace(route.params['id']);

        if (!placeExists) {
            this.router.navigate(['/404']);
        }

        return placeExists;
    }
}