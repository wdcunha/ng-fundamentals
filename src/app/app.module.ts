import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {EventsAppComponent} from './events-app.component';
import {EventsListComponent} from './events/events-list.component';
import {EventThumbnailComponent} from './events/event-thumbnail.component';
import {NavbarComponent} from './nav/navbar.component';
import {EventExampleComponent} from './events/event-example.component';
import {EventsExampleChildComponent} from './events/events-example-child.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventExampleComponent,
    EventsExampleChildComponent
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}
