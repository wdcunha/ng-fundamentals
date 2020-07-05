import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventExampleComponent,
  EventsExampleChildComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivatorService,
  EventListResolverService,
  CreateSessionComponent,
  SessionListComponent,
} from './events';
import {EventsAppComponent} from './events-app.component';
import {NavbarComponent} from './nav/navbar.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {RoutesModule} from '../routes';
import {Error404Component} from './errors/404.components';
import {UserModule} from './user/user.module';
import {AuthService} from './user/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CollapsibleWellComponent} from './common/collapsible-well.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    RoutesModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule
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
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent
  ],
  providers: [
    EventService,
    EventRouteActivatorService,
    EventListResolverService,
    AuthService,
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
