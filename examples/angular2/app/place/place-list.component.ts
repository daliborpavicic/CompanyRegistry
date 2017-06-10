import {Component, OnInit} from '@angular/core';
import {PlaceService} from "./shared/place.service";
import {ToastrService} from "../common/toastr.service";

@Component({
    selector: 'place-list',
    templateUrl: 'app/place/place-list.component.html'
})
export class PlaceListComponent implements OnInit {
    places:any[];
    // shorthand for declaring placeService property and this.placeService = placeService
    constructor(
        private placeService: PlaceService,
        private toastrService: ToastrService
    ) {
        // this.places = placeService.getPlaces();
    }

    ngOnInit() {
        this.places = this.placeService.getPlaces();
    }

    place1 = {
        id: 1,
        zipCode: 21000,
        name: 'Novi Sad'
    };

    handlePlaceClicked(placeName) {
        console.log('received:', placeName);
        this.toastrService.success(placeName);
    }
}