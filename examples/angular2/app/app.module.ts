import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
    PlaceListComponent,
    PlaceService,
    PlaceDetailsComponent,
    CreatePlaceComponent,
    PlaceRouteActivator,
    PlaceListResolver
} from './place/index';

import {CompanyRegistryAppComponent} from './app.component';
import {SideNavComponent} from './nav/side-nav.component';
import {
    TOASTR_TOKEN,
    JQ_TOKEN,
    SimpleModalComponent
} from './common/index';
import {appRoutes} from "./routes";
import {Error404Component} from "./errors/404.component";
import {
    CreateCompanyComponent
} from "./company/index";
import {ModalTriggerDirective} from "./common/modalTrigger.directive";
import {DataTableComponent} from "./data-table/data-table.component";

// tell TypeScript compiler that we now about toastr
declare let toastr: any;
declare let jQuery: any;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ // todo: You need to declare components to be bootstrapped
        CompanyRegistryAppComponent,
        PlaceListComponent,
        SideNavComponent,
        PlaceDetailsComponent,
        CreatePlaceComponent,
        Error404Component,
        CreateCompanyComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        DataTableComponent,
    ],
    providers: [
        PlaceService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        PlaceRouteActivator,
        {
            provide: 'canDeactivateCreatePlace',
            useValue: checkDirtyState
        },
        PlaceListResolver
    ],
    bootstrap: [CompanyRegistryAppComponent]
})
export class AppModule {
}

function checkDirtyState(component: CreatePlaceComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this place, do you really want to cancel ?');
    }

    return false;
}

