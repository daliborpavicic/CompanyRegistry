import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {IPlace} from './place.model';
import {MongoLabService} from '../../common/mongo-lab.service';

const {PLACES, COMPANIES, EMPLOYEES} = MongoLabService.collections;

@Injectable()
export class PlaceService {

  constructor(private mongoLab: MongoLabService) {
  }

  static getEmptyPlace(): IPlace {
    return {
      _id: '',
      postalCode: '',
      name: '',
    };
  }

  getPlaces(): Observable<IPlace[]> {
    return this.mongoLab.getEntities(PLACES);
  }

  getPlace(id: string): Observable<IPlace> {
    return this.mongoLab.getEntity(PLACES, id);
  }

  createPlace(place): Observable<IPlace> {
    if (!place._id) {
      place._id = place.postalCode;
    }

    return this.mongoLab.createEntity(PLACES, place);
  }

  updatePlace(place): Observable<IPlace> {
    return this.mongoLab.updateEntity(PLACES, place);
  }

  checkIfPlaceCanBeDeleted(id: string, name: string) {
    const employeesQuery = {placeOfBirth: name};
    const companiesQuery = {headquarters: name};

    const employeesForPlaceCount = this.mongoLab.getCountOfEntitiesByQuery(EMPLOYEES, employeesQuery);
    const companiesForPlaceCount = this.mongoLab.getCountOfEntitiesByQuery(COMPANIES, companiesQuery);

    return Observable.forkJoin([employeesForPlaceCount, companiesForPlaceCount]);
  }

  deletePlace(id: string) {
    return this.mongoLab.deleteEntity(PLACES, id);
  }
}
