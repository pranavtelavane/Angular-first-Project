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

  public signup !: FormGroup

  constructor(private router: Router, private fb: FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
    this.signup = this.fb.group({
      fullname: ['',Validators.required],
      mobile: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      repassword: ['',Validators.required],
    })
    }

    signUp(){
      debugger;
      this.http.post<any>("http://localhost:3000/signupUser",this.signup.value)
      .subscribe(res =>{
        alert("Register successfully");
        this.signup.reset();
        this.router.navigate(['login']);
      },err=>{
        alert("Something went wrong")
      })

    }
  

}
