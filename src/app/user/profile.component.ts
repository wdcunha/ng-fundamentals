import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const firstName = new FormControl(this.authService.currentUser?.firstName);
    const lastName = new FormControl(this.authService.currentUser?.lastName);
    this.profileForm = new FormGroup({
      firstName,
      lastName
    });
  }

  saveProfile(formValues) {
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
    this.router.navigate(['events']);
  }

  cancelEditProfile() {
    this.router.navigate(['events']);
  }
}