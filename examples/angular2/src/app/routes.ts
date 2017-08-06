import {Routes} from '@angular/router';
import {HomeComponent} from './core/home.component';
import {
    PlaceListComponent,
    PlaceComponent,
    PlaceListResolver
} from './place/index';
import {CompanyComponent} from './company/company.component';
import {PlaceResolver} from './place/place-resolver.service';
import {Error404Component} from './errors/404.component';
import {CompanyListComponent} from './company';
import {CompanyListResolver} from './company/company-list-resolver.service';

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
    {path: 'companies', component: CompanyListComponent, resolve: { companies: CompanyListResolver}},
    {path: 'companies/new', component: CompanyComponent},
    {path: '404', component: Error404Component},
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: '404', pathMatch: 'full'}
];
