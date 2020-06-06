import {Component} from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    li > a.active { color: #f97924 }
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px}
    @media (max-width: 1200px) {#searchForm {display: none}}`]
})
export class NavbarComponent {

}
