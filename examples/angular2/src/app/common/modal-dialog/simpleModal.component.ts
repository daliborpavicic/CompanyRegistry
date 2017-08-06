import {Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {JQ_TOKEN} from '../jQuery.service';

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button"
                    class="close"
                    data-dismiss="modal">
              <span>&times;</span>
            </button>
            <h4 class="modal-title">{{title}}</h4>
          </div>
          <div class="modal-body" (click)="handleBodyClick()">
            <ng-content></ng-content>
          </div>
          <div *ngIf="showFooter" class="modal-footer">
            <button class="btn btn-primary" (click)="confirmModal()">
              Yes
            </button>
            <button class="btn btn-warning" (click)="closeModal()">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SimpleModalComponent {
  @Input() elementId: string;
  @Input() title: string;
  @Input() showFooter = true;
  @Input() closeOnBodyClick = 'false';
  @Output() onConfirm = new EventEmitter();
  @ViewChild('modalContainer') containerEl: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) {
  }

  confirmModal() {
    this.onConfirm.emit();
    this.closeModal();
  }

  closeModal() {
    this.$(this.containerEl.nativeElement).modal('hide');
  }

  handleBodyClick() {
    if (this.closeOnBodyClick.toLowerCase() === 'true') {
      this.closeModal();
    }
  }
}
