import {Component, Input} from '@angular/core';

@Component({
  selector: 'collapsible-well',
  // templateUrl: 'collapsible-well.component.html'
  template: `
    <div (click)="toggleContent()" class="well pointable well-radius">
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `,
  styles: [`
    .well-radius {
      border-radius: 15px;
    }
  `]

})
export class CollapsibleWellComponent {
  visible = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
