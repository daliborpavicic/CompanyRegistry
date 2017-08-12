import {EmployeeResolver} from './employee-resolver.service';
import {EmployeeComponent} from './employee.component';
import {EmployeeListComponent} from './employee-list.component';
import {EmployeeListResolver} from './employee-list-resolver.service';

export const employeeRoutes = [
  {
    path: 'employees/new', component: EmployeeComponent, resolve: {employee: EmployeeResolver}
  },
  {
    path: 'employees/:id', component: EmployeeComponent, resolve: {employee: EmployeeResolver}
  },
  {
    path: 'employees', component: EmployeeListComponent, resolve: {employees: EmployeeListResolver}
  },
];
