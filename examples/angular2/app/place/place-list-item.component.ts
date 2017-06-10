import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'place-list-item',
    template: `
    <tr>
        <td>
            <span class="pad-left">{{place.zipCode}}</span>
        </td>
        <td>
            {{place.name}}
            <button (click)="handleClick()">Click me!</button>
        </td>
    </tr>`,
    styles: [`
        .pad-left { padding-left: 10px; }
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