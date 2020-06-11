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

## Forms

There are two options when creating form, template-based or model-based(called reactive forms). Template-based allows to build completely in HTML template, simple and easy, it works great for simple uses cases, but it has some limitations like when applied to complex forms, with a lot of logic, things like cross fiel validation are more difficult. Unit test is another limitation, so it's not possible  to use it in all form and validation logic. Model-based allow to build form and put a lot of logic in the component.

[(NgModel)] (two way binding that is called banana) gives some extra forms-related functionality that can be used instead of simple (input) data binding which allows to be declared in a shortly way, saving to remember everywhere it is used. It is commonly used when the field edits existing data and as it is typed in the field, data is updated in the component. When there's no this need, it is enough to have one-way data binding (ngModel) and when using it, remember to declare it on the component. Another thing that handle extra things is (ngSubmit) like preventing the form from submitting to the server. It can receive just the data that is interesting and not all data that is available in the form, using the variable name dot value (loginForm.value), and in the method within the component, retrieve the form data the same way (formValues.username and formValues.password).

## Auth component

This component will check the current user, that has user model to format data related to it. LoginUser method was created to make a call to the server and log the user in, then set this currentUser property. Auth.service was registered as a provider, but in the app.module because it will also be used in components and providers are shared across Angular modules, so eliminating the need to declare many times, being enough to do in the main module. It is not the same for imports and declarations, which demand us to declarate in whichever modules need them.

AuthService will be responsible to take the values form and to make it available to the app.

Login component is responsible to redirect after authentication is done or canceled.

Validation in the html page is possible from the loginForm variable. To understand how it works, there's some methods that can be used as shown below. When clicked on username field, the touched property changes to true and when types something in there a buch of these values changed, like username.valid is true right after. 

`
  {{'loginForm.valid: ' + loginForm.valid}}<br/>
  {{'loginForm.valid: ' + loginForm.invalid}}<br/>
  {{'loginForm.valid: ' + loginForm.dirty}}<br/>
  {{'loginForm.valid: ' + loginForm.pristine}}<br/>
  {{'loginForm.valid: ' + loginForm.submitted}}<br/>
  {{'loginForm.valid: ' + loginForm.touched}}<br/>
  {{'loginForm.valid: ' + loginForm.untouched}}<br/>

  {{'loginForm.controls.userName.valid: ' + loginForm.controls.userName.valid}}<br/>
  {{'loginForm.controls.userName.invalid: ' + loginForm.controls.userName.invalid}}<br/>
  {{'loginForm.controls.userName.dirty: ' + loginForm.controls.userName.dirty}}<br/>
  {{'loginForm.controls.userName.pristine: ' + loginForm.controls.userName.pristine}}<br/>
  {{'loginForm.controls.userName.touched: ' + loginForm.controls.userName.touched}}<br/>
  {{'loginForm.controls.userName.untouched: ' + loginForm.controls.userName.untouched}}<br/>`
  
Taking advantage of this properties, it is possible to disable the button submit using Angular property [disable] when loginForm is invalid (loginForm.invalid). Also, the fields validation error message are just launched when 'touched' and button submit has mouseoverLogin property in (mouseenter) and (mouseleave) to trigger message when the user pass mouse over that button. 

## Model-driven Form ([edit profile page](src/app/user/profile.component.ts))

This is another way to make form validation and it happens in the component, where is defined fields and validations and them they are wired up to fiels in HTML. This approach are known as Reactive Form too, which requires more extra code, but there's some advantages, for instance the option of building the form and its validation more dynamically based on decisions made in the code. Another great benefit is that  it makes all of the validation logic unit testable.

The properties created in the component is them wired up in the HTML by [formGroup] pointing to the profileForm property created within the component.

Model-driven Form or Reactive forms use a different module than template-driven forms, ReactiveFormsModule, and it has to be declared in the user.module as well.

In order to wire up the current user to the profile fields, it is necessary first to import and declare authService in the constructor, so the current user can be caught and then be passed into FormControls as parameter.

Save button requires to create a updateCurrentUser method to point and take changes to auth.service 

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
