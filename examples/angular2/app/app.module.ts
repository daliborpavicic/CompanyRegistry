import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";

import {
    PlaceListComponent,
    PlaceListItemComponent,
    PlaceService,
    PlaceDetailsComponent,
    CreatePlaceComponent,
    PlaceRouteActivator,
    PlaceListResolver
} from './place/index';

import { CompanyRegistryAppComponent } from './app.component';
import { SideNavComponent } from './nav/side-nav.component';
import { ToastrService } from './common/toastr.service';
import {appRoutes} from "./routes";
import {Error404Component} from "./errors/404.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [ // todo: You need to declare components to be bootstrapped
        CompanyRegistryAppComponent,
        PlaceListComponent,
        PlaceListItemComponent,
        SideNavComponent,
        PlaceDetailsComponent,
        CreatePlaceComponent,
        Error404Component
    ],
    providers: [
        PlaceService,
        ToastrService,
        PlaceRouteActivator,
        {
            provide: 'canDeactivateCreatePlace',
            useValue: checkDirtyState
        },
        PlaceListResolver
    ],
    bootstrap: [CompanyRegistryAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreatePlaceComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this place, do you really want to cancel ?');
    }

    return false;
}

