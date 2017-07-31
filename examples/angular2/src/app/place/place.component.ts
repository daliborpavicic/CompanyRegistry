import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceService} from './shared/place.service';
import {IPlace} from './shared/place.model';
import {TOASTR_TOKEN} from '../common/toastr.service';

@Component({
    templateUrl: './place.component.html'
})
export class PlaceComponent { // TODO: Fix validation
    isDirty = true;
    place: IPlace;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private placeService: PlaceService,
                @Inject(TOASTR_TOKEN) private toastr) {
    }

    ngOnInit() {
        this.route.data.forEach((data) => {
            this.place = data['place'];
        });
    }

    savePlace(/*formValues*/) {
        // without 2-way binding
        // console.log(formValues);
        if (this.place._id) {
            this.placeService.updatePlace(this.place).subscribe(() => this.cancel());
        } else {
            this.placeService.createPlace(this.place).subscribe(() => this.cancel());
        }
    }

    deletePlace() {
        this.placeService.deletePlace(this.place._id);
        this.cancel();
    }

    cancel() {
        this.router.navigate(['/places']);
    }
}
