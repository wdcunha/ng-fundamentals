import {Component} from '@angular/core';

/**
 * #example used in the button to invoke a method from parent component (event-example component)
 * is called template variable used in child components (inter-component communication),
 * that is the third way to communicate as @Input and @Output
 */
@Component({
  selector: 'events-example-child',
  template: `
    <div>
      <h1>Upcoming Angular Events </h1>
      <hr/>
      <event-example #example (eventClick)="handleEventClicked($event)"
        [event]="eventTest"></event-example>
      <h3>{{example.someProperty}}</h3>
      <button class="btn btn-success" (click)="example.logFoo()">Log me some foo</button>
    </div>
  `
})
export class EventsExampleChildComponent {

  eventTest = {
    id: 1,
    name: 'Angular Connect',
    date: '9/26/2036',
    time: '10:00 am',
    price: 599.00,
    imageUrl: '/assets/images/angularconnect-shield.png',
    location:  {
      address: '1057 DT',
      city: 'London',
      country: 'England'
    }
  };

  handleEventClicked(data) {
    console.log('received: ', data);
  }
}
