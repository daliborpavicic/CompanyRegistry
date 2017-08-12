import {Component, Inject, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from './shared/company.service';
import {FormService} from '../common/form/form.service';
import {TOASTR_TOKEN} from '../common/toastr.service';
import {restrictedWordsValidator} from '../common/index';
import {EntityFormComponent} from '../common/entity-form-component.model';

@Component({
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit, EntityFormComponent {
  model: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public formService: FormService,
              private companyService: CompanyService,
              @Inject(TOASTR_TOKEN) private toastr) {
    this.formService.setIsEdit(false);
  }

  ngOnInit() {
    this.model = {
      formName: 'company',
      fields: [
        {
          id: 'pib',
          name: 'pib',
          label: 'PIB',
          validators: [Validators.required]
        },
        {
          id: 'name',
          name: 'name',
          label: 'Name',
          validators: [
            Validators.required,
            restrictedWordsValidator(['FTN', 'University'])
          ]
        },
        {
          id: 'phoneNumber',
          name: 'phoneNumber',
          label: 'Phone Number',
          validators: [Validators.required]
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email',
          validators: [Validators.required, Validators.email]
        }
      ],
    };
    this.formService.initializeFormGroup(this.model);

    this.route.data.forEach((data) => {
      const companyFromRoute = data['company'];

      this.formService.updateEntityData(companyFromRoute);
    });
  }

  submitEntity() {
    const dataForSubmit = this.formService.getEntityForSubmit();

    if (dataForSubmit._id) {
      this.companyService.updateCompany(dataForSubmit)
        .subscribe(() => this.cancel());
    } else {
      this.companyService.createCompany(dataForSubmit)
        .subscribe(() => this.cancel());
    }
  }

  deleteEntity() {
    this.companyService.deleteCompany(this.formService.getOriginalEntity()._id)
      .subscribe(() => this.cancel());
  }

  cancel() {
    this.router.navigate(['/companies']);
  }
}
