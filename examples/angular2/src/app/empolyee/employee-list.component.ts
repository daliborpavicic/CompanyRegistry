import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IEmployee} from './shared/employee.model';

@Component({
    selector: 'employee-list',
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
    employees;
    columns;

    constructor(private router: Router, private route: ActivatedRoute) {
      this.employees = route.data.map(value => value.employees);
    }

    ngOnInit() {
        this.columns = [
            {key: 'jmbg', name: 'JMBG'},
            {key: 'name', name: 'Name'},
            {key: 'surname', name: 'Surname'},
            {key: 'email', name: 'Email'},
            {key: 'placeOfBirth', name: 'Place of Birth'},
        ];
    }

    handleEmployeeClicked(employee: IEmployee) {
        this.router.navigate([employee._id], {relativeTo: this.route});
    }
}
