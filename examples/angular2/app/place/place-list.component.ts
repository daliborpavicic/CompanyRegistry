import {Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlaceService} from "./shared/place.service";
import {TOASTR_TOKEN} from "../common/toastr.service";
import {IPlace} from "./shared/place.model";

@Component({
    selector: 'place-list',
    templateUrl: 'app/place/place-list.component.html'
})
export class PlaceListComponent implements OnInit {
    places: IPlace[] = [];
    columns;

    // shorthand for declaring placeService property and this.placeService = placeService
    constructor(private placeService: PlaceService,
                @Inject(TOASTR_TOKEN) private toastr,
                private router: Router,
                private route: ActivatedRoute) {
        // this.places = placeService.getPlaces();
    }

    ngOnInit() {
        // this.placeService
        //     .getPlaces()
        //     .subscribe(places => this.places = places);
        this.columns = [
            {
                key: 'zipCode',
                name: 'Zip Code'
            },
            {
                key: 'name',
                name: 'Name'
            },

        ];

        this.places = this.route.snapshot.data['places'];
    }

    handlePlaceClicked(place) {
        this.toastr.success(`Clicked ${place.name}`);
        this.router.navigate([place.id], { relativeTo: this.route });
    }
}