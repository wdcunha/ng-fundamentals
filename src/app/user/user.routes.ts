import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.components';

export const  userRoutes: Routes = [
  {path: 'profile', component: ProfileComponent}
]
