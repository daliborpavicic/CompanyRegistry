import {Routes} from '@angular/router';
import {
    PlaceListComponent,
    PlaceComponent,
    PlaceListResolver
} from './place/index';
import {Error404Component} from "./errors/404.component";
import {CreateCompanyComponent} from "./company/create-company.component";
import {PlaceResolver} from "./place/place-resolver.service";

export const appRoutes: Routes = [
    {
        path: 'places/new', component: PlaceComponent, resolve: {place: PlaceResolver}
    },
    {
        path: 'places/:id', component: PlaceComponent, resolve: {place: PlaceResolver}
    },
    {
        path: 'places', component: PlaceListComponent, resolve: {places: PlaceListResolver}
    },
    // The order of routes is important, places/new and places/:id will both match
    {path: 'companies/new', component: CreateCompanyComponent},
    {path: '404', component: Error404Component},
    {path: '', component: PlaceListComponent},
    {path: '**', redirectTo: '404', pathMatch: 'full'}
];