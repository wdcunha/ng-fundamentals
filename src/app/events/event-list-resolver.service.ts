import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {EventService} from './shared/event.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class EventListResolverService implements Resolve<any> {

  constructor(
    private eventService: EventService
  ) {
  }

  resolve(): Observable<any> {
    return this.eventService.getEvents().pipe(map(events => events));
  }
}
