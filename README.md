# NgFundamentalsPlurashight

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Technologies and technics used in this project

Scalable and Modular Architecture for CSS - [smacss](http://smacss.com/book/type-layout) is used by Angular when run the code and if we inspect it we see it structured according to this pattern, that is how it treat and target element from a component.

Installed the following:
 ngf-bootstratp `npm install ngf-bootstrap --save`.

### ngx-toastr

[Toastr](https://github.com/scttcper/ngx-toastr) is a component for showing messages for operations according personal implementation. It was installed ngx-toastr by the command in CLI `npm i ngx-toastr -s` and applied to event stack to show the message after operations. Differently of what was shown in the video in Pluralsight that has an older version, it is necessary to import it in style.scss to make it available for the whole application, also in the app.modules importing ToastModule, then after add to employee.components.

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
