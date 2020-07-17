# NgFundamentalsPlurashight

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Technologies and technics used in this project

Scalable and Modular Architecture for CSS - [smacss](http://smacss.com/book/type-layout) is used by Angular when run the code and if we inspect it we see it structured according to this pattern, that is how it treat and target element from a component.

Installed the following:
 ngf-bootstratp `npm install ngf-bootstrap --save`.

### ngx-toastr

[Toastr](https://github.com/scttcper/ngx-toastr) is a component for showing messages for operations according personal implementation. It was installed ngx-toastr by the command in CLI `npm i ngx-toastr -s` and applied to event stack to show the message after operations. Differently of what was shown in the video in Pluralsight that has an older version, it is necessary to import it in style.scss to make it available for the whole application, also in the app.modules importing ToastModule, then after add to employee.components.

### Rout guard (CanActivate)

Firt it was created for 404 error page. After created a file for 404, declaring it in app-module and creating a route, a file has to be created for [Event Route Activator](src/app/events/event-details/event-route-activator.service.ts), that needs to be add into  [app-module](src/app/app.module.ts), also in providers. Finally, put canActivate in the route path that wants to prevent the access or to reroute, in this case, launch 404 page when type a id that not exist typing in the address bar, then it was put in the Event Detail route line. It was add too a CanDeactivate to Create Event route line to prevent to cancel the create process when clicking in the button. It was used as string value to be grabbed by the provide and used by the function added within  [app-module](src/app/app.module.ts) called `checkDirtyState()`. Also it was created a variable to be checked if is to be canceled (isDirty). It prevents from navigating after saving unless to be set to false the flag dirty.

### [Resolver Service](src/app/events/event-list-resolver.service.ts) (observable - rxjs Subject)

It was add in order to make data being load async that is more realistic and to use Resolve that allows to prefetch the necessary data for a component or to do other checks prior to be loaded. One note about what was done in resolver service is that when listening to an observable, usually it's called subscribe, but because it is a resolver, actually it is needed to return an observable to Angular to watch whe it finishes, but subscribe would return a value that cannot be an observable, because it returns a subscription, not a observable. So pipe was used and then map that does the same as subscription and it returns an observable. 

After implemented this file, it was added to [app-module](src/app/app.module.ts), within providers. It was added the resolver handler to the [route](src/routes.ts) in the EventsListComponent route line with an object that has a property value. This means that always before routing, call the EventListResolverService and when it is finished with some data returned, add data to the route as a property named events. In order to consume it, it is necessary to substitute the code within ngOnInit from the [component](src/app/events/events-list.component.ts) to receive the data passed by the route, using the property events. All this implementation at end allows to load the event content after all data is ready, even the page title, without the need to wait the data to be loaded in the resolver and then load it again in that component.

## Forms

There are two options when creating form, template-based or model-based(called reactive forms). Template-based allows to build completely in HTML template, simple and easy, it works great for simple uses cases, but it has some limitations like when applied to complex forms, with a lot of logic, things like cross field validation are more difficult. Unit test is another limitation, so it's not possible  to use it in all form and validation logic. Model-based allow building form and put a lot of logic in the component.

[(NgModel)] (two way binding that is called banana) gives some extra forms-related functionality that can be used instead of simple (input) data binding which allows to be declared in a short way, saving to remember everywhere it is used. It is commonly used when the field edits existing data and as it is typed in the field, data is updated in the component. When there's no this need, it is enough to have one-way data binding (ngModel) and when using it, remember to declare it on the component. The name of the field is used to populate the form values and the ngModel is used for binding to properties to component.

Another thing that handle extra things is (ngSubmit) like preventing the form from submitting to the server. It can receive just the data that is interesting and not all data that is available in the form, using the variable name dot value (loginForm.value), and in the method within the component, retrieve the form data the same way (formValues.username and formValues.password).

NgModelGroup is used as a solution to present nested data like address, city and country within location key in the [event.model](src/app/events/shared/event.model.ts), which is applied in a div tag right before the Location div in the [create event html file](src/app/events/create-event.component.html) that takes the same name of this main field (location) and then the data that is sent now have subfields nested in the location key.

## Auth component

This component will check the current user, that has user model to format data related to it. LoginUser method was created to make a call to the server and log the user in, then set this currentUser property. Auth.service was registered as a provider, but in the app.module because it will also be used in components and providers are shared across Angular modules, so eliminating the need to declare many times, being enough to do in the main module. It is not the same for imports and declarations, which demand us to declarate in whichever modules need them.

AuthService will be responsible to take the values form and to make it available to the app.

Login component is responsible to redirect after authentication is done or canceled.

Validation in the html page is possible from the loginForm variable. To understand how it works, there's some methods that can be used as shown below. When clicked on username field, the touched property changes to true and when types something in there a buch of these values changed, like username.valid is true right after. 

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
  			{{'loginForm.controls.userName.untouched: ' + loginForm.controls.userName.untouched}}<br/>
  
Taking advantage of this properties, it is possible to disable the button submit using Angular property [disable] when loginForm is invalid (loginForm.invalid). Also, the fields validation error message are just launched when 'touched' and button submit has mouseoverLogin property in (mouseenter) and (mouseleave) to trigger message when the user pass mouse over that button. 

## Model-driven Form ([edit profile page](src/app/user/profile.component.ts))

This is another way to make form validation and it happens in the component, where is defined fields and validations and them they are wired up to fiels in HTML. This approach are known as Reactive Form too, which requires more extra code, but there's some advantages, for instance the option of building the form and its validation more dynamically based on decisions made in the code. Another great benefit is that  it makes all of the validation logic unit testable.

The properties created in the component is them wired up in the HTML by [formGroup] pointing to the profileForm property created within the component.

Model-driven Form or Reactive forms use a different module than template-driven forms, ReactiveFormsModule, and it has to be declared in the user.module as well.

In order to wire up the current user to the profile fields, it is necessary first to import and declare authService in the constructor, so the current user can be caught and then be passed into FormControls as parameter.

Save button requires to create a updateCurrentUser method to point and take changes to auth.service.

The expression `&& profileForm.controls.firstName.errors` was used because there are two validators in firstName and both would be shown and this is a solution to the first validation, because it sets true when there is a required error and `&& profileForm.controls.firstName.errors.pattern` is used to the validation about if the user typed number or letter for the first character. For more about [Validators](https://angular.io/api/forms/Validators). The fields are being accessed by the form through controls because this fields (that are FormControl) are declared private in typescript file like in [profile component](src/app/user/profile.component.ts), but it is not really necessary, as in the [create session file](src/app/events/event-details/create-session.component.ts) becoming available in html template, allowing to access directly from the variable.

## [Session component](src/app/events/event-details/create-session.component.ts)

Map is used as a way to sanity check that the shape is being passed in is correct. 

Dirty is used in the html template that is different than touched because, for instance, when putting the cursor into the field and then leave it, it's touched, not dirty, but if something is typed, it becomes dirty.

## [Custom Validator](https://app.pluralsight.com/player?course=angular-fundamentals&author=jim-cooper&name=angular-fundamentals-m6&clip=11&mode=live) 

It was created a sample function that returns a basic Javascript object `{[key: string]: any}` (doesn't matter what kind object returns) that will make restricted some words. It consists in form control check if contains one of the restricted words. Then, this function was put in the Abstract field rule in the OnInit. So basically it turns red the field as soon as we type the word(s) restricted. Also this function was added as an error more calling the new function `restrictedWords` in the OnInit within [Create-session](src/app/events/event-details/create-session.component.ts) that check the restricted word typed. But the best way to pass the restricted words is like parameter within the function call, in this case in the OnInit.

In order to make it to work like a function and receive parameter, some changes was necessary, making it a arrow function from ES6 with some TypeScript, that returns a function that is the validator itself. But to have access to the parameter words from inside the inner function is a little bit more complex. A map was included to loop over all the keywords to check the controls value to see if includes that word and after needs to filter out null values if exists. So if some invalid words exists, it will be returned and joined with the other and separated by comma to be shown above the html field to the user. 

To be reusable around the project, it was created a new file in the shared folder [restricted-words.validator file](src/app/events/shared/restricted-words.validator.ts),Its path was put in the index located in the same directory.

## Passing data to child component

Videos from pluralsight [chapter 8 Communicating between components](https://app.pluralsight.com/course-player?clipId=e01d7c86-ea20-4e42-aff9-7a45e9024c3b) teach how pass data. The [Event Detail](src/app/events/event-details/event-details.component.ts) was used as example about passing to a child component. There was a session data, but not used yet, so it was created a [session-list.component](src/app/events/event-details/session-list.component.ts) and used sessions property to bind:

            `  <session-list [sessions]="event?.sessions"></session-list>`

## Passing data to parent component

To apply an example, it was used the [Event Detail](src/app/events/event-details/event-details.component.ts). A div was added to show a button to make visible the tags for session-list as default vision and when addMode is true, then create-session form will be shown. In order to make the form add content to the correspondent event, that is in the same screen it appears, and to show a subcomponent passing data to its parente, it was added an @Output property that is EventEmitter that will bind to event details page, putting a method for it (that has ISession type parameter) within the create-session at [Event Detail html](src/app/events/event-details/event-details.component.html). A new method has been created in the event.service, it has to find the existing event () and then updates it with the new session.

Cancel button also need to have an emit method, then an @Output property was needed and a cancel method within create-session.component and wired up in the html file. So in the event-detais.component.html it is necessary to bind inside the create-session tag with a new method to turn addMode to false. That is an example how to use output parameters to pass data back to parent components.

## Reusing Components with [Content Projection - chapter 9](https://app.pluralsight.com/course-player?clipId=24c9c05f-d58b-471d-8751-1ac42febb115)

**Colapse and expand** session is the first example, hiding details and keeping just title with a simple click, [collapsible-well](src/app/common/collapsible-well.component.ts). Ng-content was used to allow Angular to know which content is inside component tags in another place and take control of it.

**Multiple slot** consists in having areas within the component, for instance, the title and body tags added to collapsible-well, using ng-content tag for each one of this in the collapsible-well.component. It will allow to apply a different format and logic for each area. Title and body tags was changed to div's tags with the correspondent name for class and each one of them will be shown in one of ng-content created here and Angular will match up automatically based on classes name. Aiming to avoid some conflict around the project because of the class names (title and body), they were changed to `well-title` and `well-body`, demanding that it be put inside square brackets at the collapsible-well.component html template.

## Filtering and Sorting Data [chapter 10 pluralsight](https://app.pluralsight.com/course-player?clipId=975fa7d3-2439-4263-8b02-11388ed041cc)

There's no pipe in Angular for this task, so it is necessary to create one for this. Identity and mutability are critical things when treating about this theme and the major reason is around performance problems. Objects and arrays are mutable and can change any time without changing their identity. Data maybe change anytime and the logic needs to verify if there was some modification inside data and this kind of operation can be a rather expensive.

String, number and date have own pipe and it works great because comparing an identity is so quick. But when filtering and sorting, the source will be objects, so the identity isn't going to change and pipe isn't going to be rerun, therefore the display isn't going to get updated. There's another option that is __Impure Pipe__. It runs on every change detection engine cycle and it is a problem because that means the sorting or filtering operation will now run unnecessarily every time an event happens in the application and the results have to be rerendered to the DOM. Like this, pipe is not recommended for this kind of operation, but do it ourselves, only updating when source data changes, since the code has to actualy change the data.

Then to exemplify filtering display, Sessions was used because it has level. A button was added to Event-details and [class.active] used to define which button is active, and it activated when the field filterBy is equal to one of the existing options selected by clicking to the button and something interesting is that the click property receives the value when clicked and not calls a method as usual. After that, sessions needs to receive this values, creating a new property binding in session-list tag in event-details.component called [filterBy], that was declared in a @Input property. So when passing value into this property, it is needed to take action in order to change what sessions are being showed, and OnChanges is the place where it was put and created a method to filter sessions. 

A new ISession[] variable was created to receive the sessions that are filtered, this way it was put in the place of sessions variable in html file. In order to clone the entire array, a quick way is to use slice it from the very first element with all the same elements `this.visibleSessions = this.sessions.slice(0)`. In the else clause, creates a subset of the array using the method filter which creates a brand-new array and pass a little lambda, returning level (field of ISession) in toLocaleLowerCase (Converts all alphabetic characters to lowercase, taking into account the host environment's current locale), in which the filter parameter is used to set the argument comparison: `session.level.toLocaleLowerCase() === filter`. 

## Sorting Data [chapter 10 pluralsight](https://app.pluralsight.com/course-player?clipId=cb7b52c0-1247-407b-a132-937845edd096)

Sorting is also applied to [session-list.component](src/app/events/event-details/session-list.component.ts), which order by votes and the other by the name, either by name in alphabetical order or by highest-voted.to see the highest-voted. The same way in filtering, it was put in session-list tag in [Event Detail html](src/app/events/event-details/event-details.component.html) the property [sortBy], and created both in event-details and session-list. Also it was put in Onchanges. For this, array has the method sorting that is good to use in this case that creates a new copy of the array and leave the original unsorted, sorting in place, but it is necessary to create a new comparison function. There were created two functions (sortByVotesDesc and sortByNameAsc) outside of the class scope, right below curly braces at the at of the file, and they are stateless functions, so don't need to be a method of the class. The function sortByVotesDesc has 2 parameters of ISession type, in which has to be compared.

For sortByNameAsc function was implemented the logic below, in wich the last else return -1 meaning the second session is before the first. It compares any given two values and tells the array's sorting method how those two values should be in relationship to each other

            > `if (firstSession.name > secondSession.name) { return 1; }
               else if (firstSession.name === secondSession.name) { return 0; }
               else { return -1; }`

For sortByVotesDesc function the logic is kind the similar, but the voter is an array, so each session has a voter array and its length property is the number of votes, which allows easily compare two different sessions number of votes by subtracting them and since it is descending sort, it is seconde minus first. So if they are equal numbers, the result will be zero, if the second is bigger number, the result will be positive and finally if the first is bigger, the result will be negative. 

            > `secondSession.voters.length - firstSession.voters.length`




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
