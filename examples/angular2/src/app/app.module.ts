import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  DataTableComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
  MongoLabService,
  FormService,
  TOASTR_TOKEN,
  JQ_TOKEN,
} from './common/index';

import {
  HomeComponent,
  SideNavComponent
} from './core/index';

import {
  PlaceListComponent,
  PlaceService,
  PlaceComponent,
  PlaceListResolver,
  PlaceResolver
} from './place/index';

import {
  CompanyListComponent,
  CompanyService,
  CompanyListResolver,
  CompanyComponent,
  CompanyResolver
} from './company/index';

import {
  EmployeeListComponent,
  EmployeeService,
  EmployeeListResolver,
  EmployeeComponent,
  EmployeeResolver
} from './empolyee/index';

import {Error404Component} from './errors/404.component';
import {appRoutes} from './routes';
import {CompanyRegistryAppComponent} from './app.component';

// tell TypeScript compiler that we now about toastr
export declare let toastr: any;
export declare let jQuery: any;

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    CompanyRegistryAppComponent,
    HomeComponent,
    SideNavComponent,
    Error404Component,
    SimpleModalComponent,
    ModalTriggerDirective,
    DataTableComponent,
    PlaceListComponent,
    PlaceComponent,
    CompanyListComponent,
    CompanyComponent,
    EmployeeListComponent,
    EmployeeComponent,
  ],
  providers: [
    MongoLabService,
    FormService,
    PlaceService,
    PlaceListResolver,
    PlaceResolver,
    CompanyService,
    CompanyListResolver,
    CompanyResolver,
    EmployeeService,
    EmployeeListResolver,
    EmployeeResolver,
    {provide: TOASTR_TOKEN, useValue: toastr},
    {provide: JQ_TOKEN, useValue: jQuery},
  ],
  bootstrap: [CompanyRegistryAppComponent]
})
export class AppModule {
}

