import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData.subscribe(authData => this.isAuthenticated = !!authData);
  }

  logout() {
    this.authService.signOutUser();
  }

}
