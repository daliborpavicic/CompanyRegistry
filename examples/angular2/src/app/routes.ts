import {Routes} from '@angular/router';
import {HomeComponent} from './core/home.component';
import {Error404Component} from './errors/404.component';
import {placeRoutes} from './place/index';
import {companyRoutes} from './company/index';
import {employeeRoutes} from './empolyee/index';

export const appRoutes: Routes = [
  ...placeRoutes,
  ...companyRoutes,
  ...employeeRoutes,
  {path: '404', component: Error404Component},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
