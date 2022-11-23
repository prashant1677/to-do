import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AngularMaterialModule } from "../material.module";

import { AccountRoutingModule } from './account-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [ RegistrationComponent, LoginComponent],
  imports: [
    AngularMaterialModule,
    CommonModule, FormsModule, 
    AccountRoutingModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),// ToastrModule added

  ]
})
export class AccountModule { }
