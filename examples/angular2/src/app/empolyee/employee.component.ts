import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Validators} from '@angular/forms';
import {EmployeeService} from './shared/employee.service';
import {TOASTR_TOKEN} from '../common/toastr.service';
import {FormService} from '../common/form/form.service';
import {EntityFormComponent} from '../common/entity-form-component.model';

@Component({
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit, EntityFormComponent {
  model: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public formService: FormService,
              private employeeService: EmployeeService,
              @Inject(TOASTR_TOKEN) private toastr) {
    this.formService.setIsEdit(false);
  }

  ngOnInit() {
    this.model = {
      formName: 'employee',
      fields: [
        {
          id: 'jmbg',
          name: 'jmbg',
          label: 'JMBG',
          validators: [Validators.required]
        },
        {
          id: 'name',
          name: 'name',
          label: 'Name',
          validators: [Validators.required]
        },
        {
          id: 'surname',
          name: 'surname',
          label: 'Surname',
          validators: [Validators.required]
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email',
          validators: [Validators.required, Validators.email]
        },
        {
          id: 'placeOfBirth',
          name: 'placeOfBirth',
          label: 'Place of Birth',
          validators: [Validators.required]
        },
      ],
    };
    this.formService.initializeFormGroup(this.model);

    this.route.data.forEach((data) => {
      const employeeFromRoute = data['employee'];

      this.formService.updateEntityData(employeeFromRoute);
    });
  }

  submitEntity() {
    const dataForSubmit = this.formService.getEntityForSubmit();

    if (dataForSubmit._id) {
      this.employeeService.updateEmployee(dataForSubmit)
        .subscribe(() => this.cancel());
    } else {
      this.employeeService.createEmployee(dataForSubmit)
        .subscribe(() => this.cancel());
    }
  }

  deleteEntity() {
    this.employeeService.deleteEmployee(this.formService.getOriginalEntity()._id)
      .subscribe(() => this.cancel());
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}

