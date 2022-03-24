import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login !: FormGroup
  submitted = false;

  constructor(private router: Router, private authservice: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
    if(this.authservice.getToken())
    {
      window.history.back();      
    }
  }
  loginf() {
    debugger;
    var user = this.login.get('email')?.value
    var password = this.login.get('password')?.value
    if (this.authservice.login(user, password)) {
      this.router.navigate(['/dashboard']);
      localStorage.setItem("user","1")
      console.log("gg")
    }

  }
  onSubmit() {
    this.loginf();
    this.submitted = true;

    if (this.login.invalid) {
      return;
    }
}
get f(){
  return this.login.controls;
}
}
