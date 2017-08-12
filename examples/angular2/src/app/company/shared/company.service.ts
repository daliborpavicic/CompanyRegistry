import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MongoLabService} from '../../common/mongo-lab.service';
import {ICompany} from './company.model';

const collectionName = 'companies';

@Injectable()
export class CompanyService {

  constructor(private mongoLab: MongoLabService) {
  }

  static getEmptyCompany(): ICompany {
    return {
      _id: '',
      pib: '',
      name: '',
      phoneNumber: '',
      email: '',
    };
  }

  getCompanies(): Observable<ICompany[]> {
    return this.mongoLab.getEntities(collectionName);
  }

  getCompany(id: string): Observable<ICompany> {
    return this.mongoLab.getEntity(collectionName, id);
  }

  createCompany(company): Observable<ICompany> {
    if (!company._id) {
      company._id = company.pib;
    }

    return this.mongoLab.createEntity(collectionName, company);
  }

  updateCompany(company): Observable<ICompany> {
    return this.mongoLab.updateEntity(collectionName, company);
  }

  deleteCompany(id) {
    return this.mongoLab.deleteEntity(collectionName, id);
  }
}
