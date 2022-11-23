import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "./authData.model";
import { ToastrService } from 'ngx-toastr';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({ providedIn: 'root' })

export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getToken() {
    // if(!this.token){
    //   this.token = localStorage.getItem['token'];
    // }
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // createAccount(authData:AuthData) {
  createAccount(regData) {
    // const regData1 = {fullName:fullName, email: email, password: password };
    this.http.post(BACKEND_URL + "/register", regData).subscribe(
      () => {

        //       //5 seconds countdown
        //       timer(0, 1000).subscribe(n=>this.secondsToRedirect-=1)

        //       console.log("User Registered successfully");
        //       this.isLoggedIn=true;
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 4000);
        this.toastr.success("User registered successfully");

        this.router.navigate(["/"]);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  // login(authData:AuthData) {
  login(userName: string, password: string) {
    const authData: AuthData = { userName: userName, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            console.log("In auth login", response);
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/todo"]);
            this.toastr.success("Logged In Successfully");
          }
          else {
            this.toastr.success('Failed', "Username or password is incorrect");
            // if(response.statusCode==0){
            console.log("Username or password is incorrect");
            // }
          }
        },
        error: (err) => {
          console.log("Login Failed ::" + err);
          this.authStatusListener.next(false);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
    this.toastr.success("You have successfully logged out");
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //save auth data in localStorage
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  //clear auth data from localStorage
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}