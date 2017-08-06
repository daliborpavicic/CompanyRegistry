import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICompany} from './shared/company.model';

@Component({
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent {
  companies;
  columns;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.companies = route.data.map(value => value.companies);
  }

  ngOnInit() {
    this.columns = [
      {key: 'pib', name: 'PIB'},
      {key: 'name', name: 'Name'},
      {key: 'phoneNumber', name: 'Phone number'},
      {key: 'email', name: 'Email'},
    ];
  }

  handleCompanyClicked(company: ICompany) {
    this.router.navigate([company._id], {relativeTo: this.route});
  }
}
