import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { PagenotfoundComponent } from './staticpages/pagenotfound/pagenotfound.component';
import { AuthGuard } from './account/auth.guard';

const routes: Routes = [
  // {
  //   path: '', 
  //   component:home
  // },
  {
    path: 'todo', 
    component:TodoComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component: RegistrationComponent
  },
  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent}

];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
