import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FormarrayComponent } from './formarray/formarray.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path:'',redirectTo:'login', pathMatch:'full'
  },
  {
    path:'signup', component : SignupComponent
  },
  {
    path : 'login', component : LoginComponent
  },
  {
    path : 'dashboard',canActivate: [AuthGuard], component : StudentDashboardComponent 
  },
  {
    path : 'form', canActivate: [AuthGuard], component : FormarrayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
