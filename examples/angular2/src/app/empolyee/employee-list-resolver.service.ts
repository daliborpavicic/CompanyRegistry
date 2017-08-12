import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {EmployeeService} from './shared/employee.service';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeListResolver implements Resolve<any> {
    constructor(private employeeService: EmployeeService) {

    }

    resolve() {
        return this.employeeService.getEmployees();
    }
}
