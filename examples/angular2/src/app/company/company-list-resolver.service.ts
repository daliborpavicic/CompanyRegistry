import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import 'rxjs/add/operator/map';
import {CompanyService} from './shared/company.service';

@Injectable()
export class CompanyListResolver implements Resolve<any> {
    constructor(private companyService: CompanyService) {

    }

    resolve() {
        return this.companyService.getCompanies();
    }
}
