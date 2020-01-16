import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.userLoaded) {
      this.isAuthenticated = !!this.userService.user;
      this.isAdmin = this.isAuthenticated && this.userService.hasRole('ADMIN');
    }
    this.userService.userObservable$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = this.isAuthenticated && this.userService.hasRole('ADMIN');
    });
  }

  logout() {
    this.userService.signOutUser().then(() => this.router.navigateByUrl('/login'));
  }

}
