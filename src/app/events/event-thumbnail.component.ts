import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2>
    <div>{{event.date}}</div>
    <div>{{event.time}}</div>
    <div>\${{event.price}}</div>
    <div>
      <span>Location: {{event.location.address}}</span>
      <span>&nbsp;</span>
      <span>{{event.location.city}}, {{event.location.country}}</span>
    </div>
      <button class="btn btn-primary" (click)="handleClickMe()">Click me!</button>
  </div>
  `
})
export class EventThumbnailComponent {

  @Input()
  event: any;

  @Output()
  eventClick = new EventEmitter();

  handleClickMe() {
    this.eventClick.emit(this.event.name);
  }
}
