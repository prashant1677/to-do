import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { AuthData } from '../authData.model';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import { RouterModule, Routes ,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoggedIn = false;
      }
    );
    if (this.authService.getIsAuth()) {
      this.router.navigate(['/todo']);
    }
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

    // console.log("x::",x);
    this.authService.login(this.f['userName'].value, this.f['password'].value)
    // this.success()
  //   .subscribe({
  //     next:(response) => {
  //       const token = response.token;
  //       // this.token = token;
  //       if (token) {
  //         console.log("In auth login",response);
  //         // const expiresInDuration = response.expiresIn;
  //         this.authService.setAuthTimer(response.expiresIn);
  //         // this.authService.autoAuthUser();
  //         this.authService.isAuthenticated = true;
  //         this.authService.userId = response.userId;
  //         this.authService.authStatusListener.next(true);
  //         const now = new Date();
  //         const expirationDate = new Date(
  //           now.getTime() + response.expiresIn * 1000
  //         );
  //         console.log("expirationDate::",expirationDate);
  //         this.authService.saveAuthData(token, expirationDate, response.userId);
  //         this.router.navigate(["/todo"]);
  //         console.log("Login success");
  //         this.toastr.success('Success', "Logged In Successfully");
          
  //       }
  //       else{
  //         // if(response.statusCode==0){
  //         this.toastr.success('Failed', "Username or password is incorrect");
  //           console.log("Username or password is incorrect");
  //         // }
  //       }
  //     },
  //     error:(err) => {
  //       console.log("Login Failed ::",err);
  //       this.toastr.success('Failed', `Error: ${err.status} ${err.message}`);

  //       // this.authService.authStatusListener.next(false);
  //     }
  // });


// if(this.authStatusSub){
//   console.log("LOGIN SUCCESS");
// }
// else{
//   console.log("LOGIN FAILED");
// }
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

  success(data: any){
		if (data.code == 200) {
			// localStorage.setItem('userData', JSON.stringify(data.data));
			// this.router.navigate(['/']);
      console.log("login success");
      this.router.navigate(["/todo"]);

			// this.toastr.success('Success', "Logged In Successfully");
		}else{
      console.log("login failed");
			// this.toastr.error('Failed', "Invalid Credentials");
		}
	}


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
