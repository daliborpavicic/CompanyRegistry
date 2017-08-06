import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CompanyService} from './shared/company.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyResolver implements Resolve<any> {
  constructor(private companyService: CompanyService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const companyId = route.params['id'];

    if (companyId) {
      return this.companyService.getCompany(companyId);
    }

    return this.companyService.getEmptyCompany();
  }
}
