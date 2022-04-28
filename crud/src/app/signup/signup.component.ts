import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signup: FormGroup;
  submitted = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.signup = this.fb.group({
      fullname: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      repassword: [''],
    })
  }


  signUp() {
    debugger;
    this.submitted = true
    if (this.signup.invalid) {
      return;
    }
    else {
      this.passwordmatcher();
      this.http.post<any>("http://localhost:3000/signupUser", this.signup.value)
        .subscribe(res => {
          alert("Register successfully");
          this.signup.reset();
          this.router.navigate(['login']);
        }, err => {
          alert("Something went wrong")
        })
    }

  }

  passwordmatcher() {
    this.submitted = true
    const pass = this.signup.controls["password"].value;
    const repass = this.signup.controls["repassword"].value

    if (pass == repass) {
       true;
    }
    else {
       false;
    }
  }

  get f() {
    return this.signup.controls;
  }

}
