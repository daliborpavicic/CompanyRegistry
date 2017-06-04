import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CompanyRegistryAppComponent } from './company-registry-app.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [CompanyRegistryAppComponent], // todo: You need to declare component to be bootstrapped
    bootstrap: [CompanyRegistryAppComponent]
})

export class AppModule {}