import {Routes} from '@angular/router';
import {HomeComponent} from './core/home.component';
import {
    PlaceListComponent,
    PlaceComponent,
    PlaceListResolver
} from './place/index';
import {CreateCompanyComponent} from './company/create-company.component';
import {PlaceResolver} from './place/place-resolver.service';
import {Error404Component} from './errors/404.component';

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
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: '404', pathMatch: 'full'}
];
