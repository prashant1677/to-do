import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { AuthService } from "../account/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authListenerSubs: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
    // if (localStorage.getItem('LoginUser')) {
    //   this.isLoggedIn = true;
    // }
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  // onLogout() {
  //   this.isLoggedIn = false;
  //   localStorage.removeItem('LoginUser');
  //   this.router.navigate(['/']);
  // }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}