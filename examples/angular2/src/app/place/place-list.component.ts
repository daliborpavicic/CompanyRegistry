import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {IPlace} from './shared/place.model';

@Component({
    selector: 'place-list',
    templateUrl: './place-list.component.html'
})
export class PlaceListComponent implements OnInit {
    places: Observable<IPlace[]> = new Observable((observer) => observer.next([]));
    columns;

    constructor(private router: Router, private route: ActivatedRoute) {
      this.places = route.data.map(value => value.places);
    }

    ngOnInit() {
        this.columns = [
            {key: 'postalCode', name: 'Postal Code'},
            {key: 'name', name: 'Name'},
        ];
    }

    handlePlaceClicked(place: IPlace) {
        this.router.navigate([place._id], {relativeTo: this.route});
    }
}
