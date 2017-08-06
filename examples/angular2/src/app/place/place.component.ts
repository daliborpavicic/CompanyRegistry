import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from './shared/place.service';
import {IPlace} from './shared/place.model';
import {TOASTR_TOKEN} from '../common/toastr.service';

const dataModel = {
  postalCode: 'postalCode',
  placeName: 'name',
};

@Component({
  templateUrl: './place.component.html'
})
export class PlaceComponent {
  place: IPlace;
  model: any;
  isEdit: boolean;

  placeForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private placeService: PlaceService,
              public fb: FormBuilder,
              @Inject(TOASTR_TOKEN) private toastr) {
    this.isEdit = false;
  }

  ngOnInit() {
    this.model = dataModel;

    this.placeForm = this.fb.group({
      [this.model.postalCode]: ['', Validators.required],
      [this.model.placeName]: ['', Validators.required],
    });

    this.route.data.forEach((data) => {
      const placeFromRoute = data['place'];

      if (placeFromRoute._id) {
        this.isEdit = true;
        this.patchValues(placeFromRoute);
      }

      this.place = placeFromRoute;
    });
  }

  patchValues(place: IPlace) {
    Object.keys(place).forEach(name => {
      if (this.placeForm.controls[name]) {
        this.placeForm.controls[name].patchValue(place[name]);
      }
    });

    this.placeForm.updateValueAndValidity();
  }

  isControlValid(controlName) {
    return this.placeForm.controls[controlName].valid;
  }

  isControlTouched(controlName) {
    return this.placeForm.controls[controlName].touched;
  }

  shouldDisplayError(controlName) {
    return !this.isControlValid(controlName) && this.isControlTouched(controlName);
  }

  getControlClass(controlName) {
    return {
      'form-group': true,
      'has-error': this.shouldDisplayError(controlName),
    };
  }

  submitPlace({ value, valid }) {
    if (valid) {
      Object.keys(this.place).forEach(name => {
        if (value[name]) {
          this.place[name] = value[name];
        }
      });

      if (this.place._id) {
        this.placeService.updatePlace(this.place).subscribe(() => this.cancel());
      } else {
        this.placeService.createPlace(this.place).subscribe(() => this.cancel());
      }
    }
  }

  revertChanges() {
    this.patchValues(this.place);
  }

  deletePlace() {
    this.placeService.deletePlace(this.place._id).subscribe(() => this.cancel());
  }

  cancel() {
    this.router.navigate(['/places']);
  }
}
