import {Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {JQ_TOKEN} from "./jQuery.service";

@Directive({
    selector: '[modal-trigger]', // [] indicate that this is an attribute like in CSS syntax
})
export class ModalTriggerDirective implements OnInit {
    private el: HTMLElement; // global JS type
    @Input('modal-trigger') modalId: string;

    constructor(
        ref: ElementRef, // when directive is constructed we want a reference to an element that it's on
        @Inject(JQ_TOKEN) private $: any
    ) {
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        // Whenever the button that this directive is on is clicked open the modal
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({});
        })
    }
}