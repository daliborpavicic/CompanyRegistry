import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CompanyRegistryAppComponent } from './app.component';
import { PlaceListComponent } from './place/place-list.component';
import { PlaceListItemComponent } from './place/place-list-item.component';
import { SideNavComponent } from './nav/side-nav.component';
import { PlaceService } from './place/shared/place.service';
import { ToastrService } from './common/toastr.service';

@NgModule({
    imports: [BrowserModule],
    declarations: [ // todo: You need to declare components to be bootstrapped
        CompanyRegistryAppComponent,
        PlaceListComponent,
        PlaceListItemComponent,
        SideNavComponent
    ],
    providers: [
        PlaceService,
        ToastrService
    ],
    bootstrap: [CompanyRegistryAppComponent]
})

export class AppModule {}