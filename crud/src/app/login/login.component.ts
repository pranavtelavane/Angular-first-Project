import { HttpClient } from '@angular/common/http';
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

  login : FormGroup
  submitted = false;

  constructor(private router: Router, private authservice: AuthService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    if (this.authservice.getToken()) {
      window.history.back();
    }
  }
  loginf() {
    debugger;
    this.http.get<any>("http://localhost:3000/signupUser")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email == this.login.value.email && a.password == this.login.value.password
        });
        if (user) {
          alert("Login successfully");
          this.login.reset();
          this.router.navigate(['/dashboard']);
          localStorage.setItem("user", "1")
        }else{
          alert("User not found");
        }
      })
    // var user = this.login.get('username')?.value
    // var password = this.login.get('password')?.value
    // if (this.authservice.login(user, password)) {
    //   this.router.navigate(['/dashboard']);
    //   localStorage.setItem("user", "1")
    //   console.log("gg")
    // }
    // else {
    //   alert("Please enter correct userame and password");
    // }

  }
  onSubmit() {
    
    this.submitted = true;

    if (this.login.invalid) {
      return;
    }
    else{
      this.loginf();
    }
  }
  get f() {
    return this.login.controls;
  }
}
