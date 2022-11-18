import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

import {  timer, Observable, Subscription } from "rxjs";
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isLoggedIn = false;
  private authStatusSub: Subscription;
  passwordMatched=false;
  registrationForm: FormGroup;
  submitted = false;
  secondsToRedirect = 5;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {}


  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoggedIn = false;
      }
    );


   
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'cnfPassword')
  }
  );

  }

  get f() { return this.registrationForm.controls; }
 

  onSignup() {
    this.submitted = true;
    console.log("form::",this.registrationForm.value);
    if (this.registrationForm.invalid || this.registrationForm.value.password!=this.registrationForm.value.cnfPassword) {
    console.log("Invalid form::");
      return;
    }
    // this.isLoggedIn = true;
    // console.log("sign up::",form.value.fullName+"--",form.value.userName, "--", form.value.password)
    this.authService.createAccount(this.registrationForm.value)
    .subscribe({
      next:(response) => {

        //5 seconds countdown
        timer(0, 1000).subscribe(n=>this.secondsToRedirect-=1)
    
        console.log("User Registered successfully");
        this.isLoggedIn=true;
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 4000);
        
      },
      error:(err) => {
        // this.authService.authStatusListener.next(false);
        console.log("User not Registered");

      }
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
