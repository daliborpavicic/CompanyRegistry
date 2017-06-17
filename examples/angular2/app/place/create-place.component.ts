import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {PlaceService} from "./shared/place.service";

@Component({
    templateUrl: 'app/place/create-place.component.html'
})
export class CreatePlaceComponent {
    isDirty:boolean = true;

    constructor(
        private router:Router,
        private placeService:PlaceService
    ) {

    }

    addPlace(formValues) {
        console.log(formValues);
        this.placeService.addPlace(formValues.zipCode, formValues.placeName);
        this.router.navigate(['/places']);
    }

    cancel() {
        this.router.navigate(['/places']);
    }
}