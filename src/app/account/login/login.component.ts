import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { AuthData } from '../authData.model';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authStatusSub: Subscription;
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoggedIn = false;
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("login clicked", this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoggedIn = true;
    this.loading = true;

    this.authService.login(this.f['userName'].value, this.f['password'].value)
// console.log("x::",x);

    // this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
    // .subscribe({
    //           next:(data) => {
    //               this.router.navigate([this.returnUrl]);
    //           },
    //           error: (err) => {
    //               // this.alertService.error(error);
    //               this.loading = false;
    //           }
    //         });
    // errorMessage = "Invalid Username or password. Please check and try again";

    // .subscribe(
    //   res=> console.log(res),
    //   err=> console.log(err)
    // )

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
