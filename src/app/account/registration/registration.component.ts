import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../authData.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
// import { NgForm } from "@angular/forms";

import { Subscription } from "rxjs";
import { FormsModule } from '@angular/forms';
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

  constructor(private fb: FormBuilder, public authService: AuthService) {}


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

  // passwordMustMatch(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: cnfPassword } = formGroup.get('cnfPassword');
  //   return password === cnfPassword ? null : true ;
  // }


  onSignup() {
    this.submitted = true;
    console.log("form::",this.registrationForm.value);
    // if(form.value.password==form.value.cnfPassword){
    //   this.passwordMatched=true;
    // }
    if (this.registrationForm.invalid || this.registrationForm.value.password!=this.registrationForm.value.cnfPassword) {
    console.log("Invalid form::");
      return;
    }
    // this.isLoggedIn = true;
    // console.log("sign up::",form.value.fullName+"--",form.value.userName, "--", form.value.password)
    this.authService.createAccount(this.registrationForm.value);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
