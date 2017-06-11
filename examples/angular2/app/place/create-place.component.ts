import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    template: `
        <h1>New place</h1>
        <hr>
        <div>
            <h3>Create place form will go here</h3>
            <br />
            <br />
            <button type="submit">Save</button>
            <button type="button" (click)="cancel()">Cancel</button>
        </div>
    `
})
export class CreatePlaceComponent {
    isDirty:boolean = true;

    constructor(private router:Router) {

    }
    cancel() {
        this.router.navigate(['/places']);
    }
}