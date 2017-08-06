import {Inject, Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ICompany} from './company.model';
import {MongoLabService} from '../../common/mongo-lab.service';

const collectionName = 'companies';

@Injectable()
export class CompanyService {

  constructor(private http: Http,
              private mongoLab: MongoLabService) {
  }

  getCompanies(): Observable<ICompany[]> {
    const url = this.mongoLab.getUrlForCollection(collectionName);

    return this.http.get(url)
      .map((response: Response) => <ICompany[]>response.json());
  }

  getCompany(id: string): Observable<ICompany> {
    const url = this.mongoLab.getUrlForEntity(collectionName, id);

    return this.http.get(url)
      .map((response: Response) => <ICompany>response.json());
  }

  getEmptyCompany() {
    return {
      _id: '',
      pib: '',
      name: '',
      phoneNumber: '',
      email: '',
    };
  }

  addCompany() {
    const nextId = Math.max.apply(null, COMPANIES.map(c => c._id));
    console.log('next id= ', nextId + 1);
  }
}

const COMPANIES = [
  {'_id': '000', 'pib': '000', 'name': 'Univer Export', 'phoneNumber': '021/666-888', 'email': 'univer@gmail.com'},
  {'_id': '111', 'pib': '111', 'name': 'CMarket', 'phoneNumber': '021/333-666', 'email': 'market@gmail.com'},
  {'_id': '222', 'pib': '222', 'name': 'Roda', 'phoneNumber': '021/111-999', 'email': 'roda@gmail.com'},
  {'_id': '333', 'pib': '333', 'name': 'Idea', 'phoneNumber': '021/555-000', 'email': 'idea@gmail.com'},
  {'_id': '444', 'pib': '444', 'name': 'Tempo', 'phoneNumber': '021/222-444', 'email': 'tempo@gmail.com'}
];
