import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'place-list-item',
    template: `
    <tr [routerLink]="['/places', place.id]">
        <td>
            {{place.zipCode}}
        </td>
        <td>
            {{place.name}}
        </td>
        <td>
            <button (click)="handleClick()">Click me!</button>
        </td>
    </tr>`,
    styles: [`        
        tr:hover { background-color: #51a351; }
        td { padding: 5px 10px 5px 10px; }
    `]
})
export class PlaceListItemComponent {
    @Input() place: any;
    @Output() eventClick = new EventEmitter();

    someProperty: any = "some value";

    handleClick() {
        this.eventClick.emit(this.place.name);
    }

    logFoo() {
        console.log('foo');
    }
}