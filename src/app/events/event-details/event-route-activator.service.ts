import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {EventService} from '../shared/event.service';

@Injectable({
    providedIn: 'root'
  }
)
export class EventRouteActivatorService implements CanActivate {

  constructor(
    private eventService: EventService,
    private router: Router
  ) {
  }

  /**
   * @param route
   * ActivatedRouteSnapshot holds the Route id that we need to control the navigation
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const eventExist = !!this.eventService.getEvent(+route.params.id);
    if (!eventExist) {
      this.router.navigate(['404']);
    }

    return eventExist;
  }

}
