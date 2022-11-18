import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './material.module'   //All material ui modules imported

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthService } from './account/auth.service';
import { HomeComponent } from './staticpages/home/home.component';
import { AuthInterceptor } from './account/auth.interceptor';
import { AccountModule } from './account/account.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './account/auth.guard';
import { CardComponent } from './todo/card/card.component';
import { FormsModule } from '@angular/forms';
import { AddEditComponent } from './todo/add-edit/add-edit.component';
// import { DialogComponent } from './todo/dialog/dialog.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoComponent,
    HomeComponent,
    CardComponent,
    AddEditComponent,
    // DialogComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule
  ],
  providers: [
    // AuthService, //calling service in providers
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    AuthGuard,
    // {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    // {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
    ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
