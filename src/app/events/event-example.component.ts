import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'event-example',
  template: `
    <div class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2>
    <div>{{event.date}}</div>
    <div>{{event.time}}</div>
    <div>\${{event.price}}</div>
    <div>
      <span>Location: {{event.location.address}}</span>
<!--      <span>&nbsp;</span>-->
      <span class="pad-left">{{event.location.city}}, {{event.location.country}}</span>
    </div>
      <button class="btn btn-primary" (click)="handleClickMe()">Click me!</button>
  </div>
  `,
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb }
  `]
})
export class EventExampleComponent {

  @Input()
  event: any;

  @Output()
  eventClick = new EventEmitter();

  someProperty: any = 'some value';

  handleClickMe() {
    this.eventClick.emit(this.event.name);
  }

  logFoo() {
    console.log('foo');
  }

}
