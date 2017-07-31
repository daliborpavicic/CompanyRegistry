import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPlace} from './shared/place.model';

@Component({
    selector: 'place-list',
    templateUrl: './place-list.component.html'
})
export class PlaceListComponent implements OnInit {
    places: IPlace[] = [];
    columns;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.columns = [
            {key: 'postalCode', name: 'Postal Code'},
            {key: 'name', name: 'Name'},
        ];

        this.places = this.route.snapshot.data['places'];
    }

    handlePlaceClicked(place: IPlace) {
        this.router.navigate([place._id], {relativeTo: this.route});
    }
}
