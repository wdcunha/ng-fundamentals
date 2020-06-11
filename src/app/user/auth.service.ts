import {Injectable} from '@angular/core';
import {IUser} from './user.model';

/**
 * Using the Data from your template-based - chapter 7
 * https://app.pluralsight.com/course-player?clipId=b4647666-8691-47a2-8c3c-4297d9dacb5f
 */
@Injectable()
export class AuthService {
  currentUser: IUser;

  loginUser(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      userName,
      firstName: 'John',
      lastName: 'Papa'
    };
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}
