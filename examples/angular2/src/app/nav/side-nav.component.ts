import { Component } from '@angular/core';

@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styles: [`
        li > a.active { color: #2f96b4; }
    `]
})
export class SideNavComponent {

}
