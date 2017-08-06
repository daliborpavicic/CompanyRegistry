import {Component} from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styles: [`
    .nav-sidebar {
      background-color: #F8F8F8;
    }

    .nav-sidebar a.active,
    .nav-sidebar a.active:hover,
    .nav-sidebar a.active:focus {
      color: #fff;
      background-color: #428bca;
    }
  `]
})
export class SideNavComponent {

}
