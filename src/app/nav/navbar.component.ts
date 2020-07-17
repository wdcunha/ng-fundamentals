import {Component} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {EventService, ISession} from '../events/shared';
import {Observable} from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    li > a.active { color: #f97924 }
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px}
    @media (max-width: 1200px) {#searchForm {display: none}}
  `]
})
export class NavbarComponent {
  searchTerm = '';
  foundSessions: ISession[];

  constructor(
    public authService: AuthService,
    public eventService: EventService
  ) {
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }
}
