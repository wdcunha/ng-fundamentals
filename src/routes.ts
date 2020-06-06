import {RouterModule, Routes} from '@angular/router';
import {EventsListComponent} from './app/events/events-list.component';
import {EventDetailsComponent} from './app/events/event-details/event-details.component';
import {NgModule} from '@angular/core';
import {CreateEventComponent} from './app/events/create-event.component';
import {Error404Component} from './app/errors/404.components';
import {EventRouteActivatorService} from './app/events/event-details/event-route-activator.service';

const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService] },
  { path: '404', component: Error404Component},
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutesModule {
}
