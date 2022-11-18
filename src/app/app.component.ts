import { Component } from '@angular/core';
import { UserdataService } from './userdata.service';
import { Router } from '@angular/router';
import { AuthService } from './account/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'AngularToDo';
  constructor(private userdataService:UserdataService, public router:Router, private authService:AuthService){
    let userdata=userdataService.getUserData();
    console.log(userdata);
  }

  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
