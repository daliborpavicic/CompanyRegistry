///<reference path="company.component.ts"/>
import {CompanyResolver} from './company-resolver.service';
import {CompanyComponent} from './company.component';
import {CompanyListComponent} from './company-list.component';
import {CompanyListResolver} from './company-list-resolver.service';

export const companyRoutes = [
  {path: 'companies', component: CompanyListComponent, resolve: { companies: CompanyListResolver}},
  {path: 'companies/new', component: CompanyComponent,  resolve: { company: CompanyResolver }},
  {path: 'companies/:id', component: CompanyComponent, resolve: { company: CompanyResolver }},
];
