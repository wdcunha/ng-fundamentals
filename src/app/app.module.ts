import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {EventsAppComponent} from './events-app.component';
import {EventsListComponent} from './events/events-list.component';
import {EventThumbnailComponent} from './events/event-thumbnail.component';
import {NavbarComponent} from './nav/navbar.component';
import {EventExampleComponent} from './events/event-example.component';
import {EventsExampleChildComponent} from './events/events-example-child.component';
import {EventService} from './events/shared/event.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventDetailsComponent} from './events/event-details/event-details.component';
import {RouterModule} from '@angular/router';
import {RoutesModule} from '../routes';
import {CreateEventComponent} from './events/create-event.component';
import {Error404Component} from './errors/404.components';
import {EventRouteActivatorService} from './events/event-details/event-route-activator.service';
import {EventListResolverService} from './events/event-list-resolver.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    RoutesModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventExampleComponent,
    EventsExampleChildComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  providers: [
    EventService,
    EventRouteActivatorService,
    EventListResolverService,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('Data not saved, do you really want to cancel?');
  }
  return true;
}
