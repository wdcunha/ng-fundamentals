# NgFundamentalsPlurashight

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Technologies and technics used in this project

Scalable and Modular Architecture for CSS - [smacss](http://smacss.com/book/type-layout) is used by Angular when run the code and if we inspect it we see it structured according to this pattern, that is how it treat and target element from a component.

Installed the following:
 ngf-bootstratp `npm install ngf-bootstrap --save`.

### ngx-toastr

[Toastr](https://github.com/scttcper/ngx-toastr) is a component for showing messages for operations according personal implementation. It was installed ngx-toastr by the command in CLI `npm i ngx-toastr -s` and applied to event stack to show the message after operations. Differently of what was shown in the video in Pluralsight that has an older version, it is necessary to import it in style.scss to make it available for the whole application, also in the app.modules importing ToastModule, then after add to employee.components.

### Rout guard (CanActivate)

Firt it was created for 404 error page. After created a file for 404, declaring it in app-module and creating a route, a file has to be created for [Event Route Activator](src/app/events/event-details/event-route-activator.service.ts), that needs to be add into  [app-module](src/app/app.module.ts), also in providers. Finally, put canActivate in the route path that wants to prevent the access or to reroute, in this case, launch 404 page when type a id that not exist typing in the address bar, then it was put in the Event Detail route line. It was add too a CanDeactivate to Create Event route line to prevent to cancel the create process when clicking in the button. It was used as string value to be grabbed by the provide and used by the function added within  [app-module](src/app/app.module.ts) called `checkDirtyState()`. Also it was created a variable to be checked if is to be canceled (isDirty).

### [Resolver Service](src/app/events/event-list-resolver.service.ts) (observable - rxjs Subject)

It was add in order to make data being load async that is more realistic and to use Resolve that allows to prefetch the necessary data for a component or to do other checks prior to be loaded. One note about what was done in resolver service is that when listening to an observable, usually it's called subscribe, but because it is a resolver, actually it is needed to return an observable to Angular to watch whe it finishes, but subscribe would return a value that cannot be an observable, because it returns a subscription, not a observable. So pipe was used and then map that does the same as subscription and it returns an observable. 

After implemented this file, it was added to [app-module](src/app/app.module.ts), within providers. It was added the resolver handler to the [route](src/routes.ts) in the EventsListComponent route line with an object that has a property value. This means that always before routing, call the EventListResolverService and when it is finished with some data returned, add data to the route as a property named events. In order to consume it, it is necessary to substitute the code within ngOnInit from the [component](src/app/events/events-list.component.ts) to receive the data passed by the route, using the property events. All this implementation at end allows to load the event content after all data is ready, even the page title, without the need to wait the data to be loaded in the resolver and then load it again in that component.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
