// place/:id
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PlaceService} from "../shared/place.service";

@Component({
    // we don't need a selector since component is going to be used
    // as a separate page, not as a child componet
    templateUrl: '/app/place/place-details/place-details.component.html'
})
export class PlaceDetailsComponent {
    place:any;

    constructor(
        private placeService:PlaceService,
        private route:ActivatedRoute
    ) {}

    ngOnInit() {
        this.place = this.placeService.getPlace(
            this.route.snapshot.params['id']
        );
    }
}