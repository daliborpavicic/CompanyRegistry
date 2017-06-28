import {Component, OnInit, Inject} from '@angular/core';
import {PlaceService} from "./shared/place.service";
import { TOASTR_TOKEN } from "../common/toastr.service";
import {ActivatedRoute} from "@angular/router";
import {IPlace} from "./shared/place.model";

@Component({
    selector: 'place-list',
    templateUrl: 'app/place/place-list.component.html'
})
export class PlaceListComponent implements OnInit {
    places:IPlace[];
    // shorthand for declaring placeService property and this.placeService = placeService
    constructor(
        private placeService: PlaceService,
        @Inject(TOASTR_TOKEN) private toastr,
        private route:ActivatedRoute
    ) {
        // this.places = placeService.getPlaces();
    }

    ngOnInit() {
        // this.placeService
        //     .getPlaces()
        //     .subscribe(places => this.places = places);
        this.places = this.route.snapshot.data['places'];
    }

    place1 = {
        id: 1,
        zipCode: 21000,
        name: 'Novi Sad'
    };

    handlePlaceClicked(placeName) {
        console.log('received:', placeName);
        this.toastr.success(placeName);
    }
}