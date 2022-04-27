import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APIComponent } from './api-binding/api/api.component';
import { InfoComponent } from './api-binding/info/info.component';
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
  },
  {
    path : 'api', component : APIComponent
  },
  {
    path : 'info', component : InfoComponent
  }

  // {
  //   path: 'transport',
  //   loadChildren: () => import().then(m => m.APIBindingModule),
  //   data: {
  //     title: 'Transport'
  //   },
  //   canActivate: [AuthGuard]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
