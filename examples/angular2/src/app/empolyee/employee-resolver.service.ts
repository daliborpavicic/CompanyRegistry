import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import 'rxjs/add/operator/map';
import {EmployeeService} from './shared/employee.service';

@Injectable()
export class EmployeeResolver implements Resolve<any> {
    constructor(private employeeService: EmployeeService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const employeeId = route.params['id'];

        if (employeeId) {
            return this.employeeService.getEmployee(employeeId);
        }

        return EmployeeService.getEmptyEmployee();
    }
}
