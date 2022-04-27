import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { FormarrayComponent } from './formarray/formarray.component';
import { SignupComponent } from './signup/signup.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { APIBindingModule } from './api-binding/api-binding.module';

@NgModule({
  declarations: [
    AppComponent,
    StudentDashboardComponent,
    LoginComponent,
    FormarrayComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    APIBindingModule
  
  ],
  exports:[StudentDashboardComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
