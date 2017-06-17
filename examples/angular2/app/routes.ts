import { Routes } from '@angular/router';
import {
    PlaceListComponent,
    PlaceDetailsComponent,
    CreatePlaceComponent,
    PlaceRouteActivator,
    PlaceListResolver
} from './place/index';
import {Error404Component} from "./errors/404.component";
import {CreateCompanyComponent} from "./company/create-company.component";

export const appRoutes:Routes = [
    // The order of routes is important, places/new and places/:id will both match
    { path: 'places/new', component: CreatePlaceComponent, canDeactivate: ['canDeactivateCreatePlace'] },
    { path: '', component: PlaceListComponent },
    { path: 'places', component: PlaceListComponent, resolve: {
        places: PlaceListResolver
    } },
    { path: 'places/:id', component: PlaceDetailsComponent, canActivate: [PlaceRouteActivator] },
    { path: 'companies/new', component: CreateCompanyComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/', pathMatch: 'full' }
];