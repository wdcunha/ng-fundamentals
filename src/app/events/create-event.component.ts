import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  template: `
    <h1>New Event</h1>
    <hr>
    <div class="col-md-6">
      <h3>[Create Event Form will go here]</h3>
      <br/>
      <br/>
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-default" (click)="cancelCreating()">Cancel</button>
    </div>
  `
})
export class CreateEventComponent {

  isDirty = true;

  constructor(
    private toastrService: ToastrService,
    private router: Router
  ) {}

  cancelCreating() {
    this.toastrService.error('Event creation aborted!');
    this.router.navigate(['events']);
  }
}
