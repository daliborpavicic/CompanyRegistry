import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Validators} from '@angular/forms';
import {PlaceService} from './shared/place.service';
import {TOASTR_TOKEN} from '../common/toastr.service';
import {FormService} from '../common/form/form.service';
import {EntityFormComponent} from '../common/entity-form-component.model';

@Component({
  templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit, EntityFormComponent {
  model: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public formService: FormService,
              private placeService: PlaceService,
              @Inject(TOASTR_TOKEN) private toastr) {
    this.formService.setIsEdit(false);
  }

  ngOnInit() {
    this.model = {
      formName: 'place',
      fields: [
        {
          id: 'postalCode',
          name: 'postalCode',
          label: 'Postal code',
          validators: [Validators.required]
        },
        {
          id: 'name',
          name: 'name',
          label: 'Name',
          validators: [Validators.required]
        },
      ],
    };
    this.formService.initializeFormGroup(this.model);

    this.route.data.forEach((data) => {
      const placeFromRoute = data['place'];

      this.formService.updateEntityData(placeFromRoute);
    });
  }

  submitEntity() {
    const dataForSubmit = this.formService.getEntityForSubmit();

    if (dataForSubmit._id) {
      this.placeService.updatePlace(dataForSubmit)
        .subscribe(() => this.cancel());
    } else {
      this.placeService.createPlace(dataForSubmit)
        .subscribe(() => this.cancel());
    }
  }

  deleteEntity() {
    const { _id, name } = this.formService.getOriginalEntity();
    this.placeService.checkIfPlaceCanBeDeleted(_id, name)
      .subscribe((result) => {
        const referringEmployees = result[0];
        const referringCompanies = result[1];

        if (referringEmployees > 0 || referringCompanies > 0) {
          alert(`Place '${name}' cannot be deleted since it's referrenced by other entities`);
        } else {
          this.placeService.deletePlace(_id).subscribe(() => this.cancel());
        }
      });
  }

  cancel() {
    this.router.navigate(['/places']);
  }
}

