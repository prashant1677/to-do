import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor() { }
  getUserData() {
    return {
      message:"testing",
      userName: "prashant",
      email: "prashant@gmail.comm",
      mobNo: 8871123432
    }
  }
}
