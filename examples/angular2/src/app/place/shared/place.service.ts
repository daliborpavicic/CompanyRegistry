import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IPlace} from './place.model';
import {MongoLabService} from '../../common/mongo-lab.service';

const collectionName = 'places';

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
    return this.mongoLab.getEntities(collectionName);
  }

  getPlace(id: string): Observable<IPlace> {
    return this.mongoLab.getEntity(collectionName, id);
  }

  createPlace(place): Observable<IPlace> {
    if (!place._id) {
      place._id = place.postalCode;
    }

    return this.mongoLab.createEntity(collectionName, place);
  }

  updatePlace(place): Observable<IPlace> {
    return this.mongoLab.updateEntity(collectionName, place);
  }

  deletePlace(id) {
    // TODO: Do not allow deletion if place is referecend by other entities
    return this.mongoLab.deleteEntity(collectionName, id);
  }
}
