import {PlaceResolver} from './place-resolver.service';
import {PlaceComponent} from './place.component';
import {PlaceListComponent} from './place-list.component';
import {PlaceListResolver} from './place-list-resolver.service';

export const placeRoutes = [
  {
    path: 'places/new', component: PlaceComponent, resolve: {place: PlaceResolver}
  },
  {
    path: 'places/:id', component: PlaceComponent, resolve: {place: PlaceResolver}
  },
  {
    path: 'places', component: PlaceListComponent, resolve: {places: PlaceListResolver}
  },
];
