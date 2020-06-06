import {Component, OnInit} from '@angular/core';
import {EventService} from './shared/event.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events </h1>
      <hr/>
      <div class="row">
        <div *ngFor="let event of eventList" class="col-md-5">
            <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
        </div>
      </div>
    </div>
  `
})
export class EventsListComponent implements OnInit {
  eventList: any[];
  constructor(
    private eventService: EventService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventList = this.eventService.getEvents();

  }

  handleThumbnailClick(eventName) {
    this.toastrService.success(eventName);
    this.router.navigate(['events/:id']);
  }
}
