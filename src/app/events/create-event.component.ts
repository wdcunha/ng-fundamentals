import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {EventService} from './shared';

@Component({
  templateUrl: 'create-event.component.html',
  styles: [`
    em {
      float: right;
      color: #E05C65;
      padding-left: 10px;
    }

    .error input {
      background-color: #E3C3C5
    }

    .error ::-webkit-input-placeholder {
      color: #999;
    }

    .error ::-moz-placeholder {
      color: #999;
    }

    .error :-moz-placeholder {
      color: #999;
    }

    .error :-ms-input-placeholder {
      color: #999;
    }
  `]
})
export class CreateEventComponent {

  isDirty = true;
  newEvent: any;


  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private eventService: EventService
  ) {}

  saveEvent(formValues){
    console.log(formValues);
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }

  cancelCreating() {
    this.toastrService.error('Event creation aborted!');
    this.router.navigate(['events']);
  }
}
