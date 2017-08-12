import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IEmployee} from './employee.model';
import {MongoLabService} from '../../common/mongo-lab.service';

const collectionName = 'employees';

@Injectable()
export class EmployeeService {

  constructor(private mongoLab: MongoLabService) {
  }

  static getEmptyEmployee(): IEmployee {
    return {
      _id: '',
      jmbg: '',
      name: '',
      surname: '',
      email: '',
      placeOfBirth: ''
    };
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.mongoLab.getEntities(collectionName);
  }

  getEmployee(id: string): Observable<IEmployee> {
    return this.mongoLab.getEntity(collectionName, id);
  }

  createEmployee(employee): Observable<IEmployee> {
    if (!employee._id) {
      employee._id = employee.jmbg;
    }

    return this.mongoLab.createEntity(collectionName, employee);
  }

  updateEmployee(employee): Observable<IEmployee> {
    return this.mongoLab.updateEntity(collectionName, employee);
  }

  deleteEmployee(id) {
    return this.mongoLab.deleteEntity(collectionName, id);
  }
}
