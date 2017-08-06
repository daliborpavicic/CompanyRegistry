import {Component} from '@angular/core';

@Component({
  selector: 'company-registry',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2">
          <side-nav></side-nav>
        </div>
        <div class="col-sm-10">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
export class CompanyRegistryAppComponent {

}
