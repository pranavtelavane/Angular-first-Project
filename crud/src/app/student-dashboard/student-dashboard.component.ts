import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  //formsubmit!: boolean;
  studentValue!: FormGroup
  submitted = false;
  
  studentObj: StudentModel = new StudentModel;
  studentList: any = [];
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router : Router) { }
  

  ngOnInit(): void {
    this.studentValue = this.formBuilder.group({
      name: ['',Validators.required],
      class: ['',Validators.required],
      email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      mobile: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
    this.getStudent();
  }
  AddStudent() {
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.api.postStudent(this.studentObj).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e);
        alert("Error")
      },
      complete: () => {
        console.log('Student data added succssfully')
        alert("Student data added succssfully!")
        this.getStudent();
        this.studentValue.reset();
      }
    })
  }

  getStudent() {
    this.api.getStudent().subscribe(res => {
      this.studentList = res;
    })
  }

  deleteStudent(data: any) {
    //debugger;
    this.api.deleteStudent(data.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e);
        alert("Error")
      },
      complete: () => {
        console.log('Student data deleted succssfully')
        alert("Student data deleted succssfully!")
        this.getStudent();
      }
    })
  }

  editStudent(data:any) {
   // debugger;
    this.showUpdate();
    this.studentValue.controls["name"].setValue(data.name);
    this.studentValue.controls["class"].setValue(data.class);
    this.studentValue.controls["email"].setValue(data.email);
    this.studentValue.controls["mobile"].setValue(data.mobile)
    this.studentObj.id = data.id;
   
    
  }
  reset(){
    this.studentValue.reset();
  }

  UpdateStudent() {
    //debugger;
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.api.putStudent(this.studentObj, this.studentObj.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      // error: (e) => {
      //   console.log(e);
      //   alert("Error")
      // },
      complete: () => {
        console.log('Student data updated succssfully')
        alert("Student data updated succssfully!")
        this.getStudent();
        this.studentValue.reset();
        this.showSave();
        this.studentObj.id = 0;
      }
    })
  }

  showSave(){
    this.btnSaveShow = true;
    this.btnUpdateShow = false;
  }

  showUpdate(){
    this.btnSaveShow = false;
    this.btnUpdateShow = true;
  }

  logout() {
    // debugger;
    localStorage.removeItem("user");
    this.router.navigate(["/login"])
  }
  
  
  onSubmit(){
    this.submitted = true;
    if(this.studentValue.invalid){
      return;
    }

    this.AddStudent()
    this.UpdateStudent()
    this.studentValue.get('name')?.clearValidators();
    this.studentValue.get('name')?.updateValueAndValidity();
    this.studentValue.get('class')?.clearValidators();
    this.studentValue.get('class')?.updateValueAndValidity();
    this.studentValue.get('email')?.clearValidators();
    this.studentValue.get('email')?.updateValueAndValidity();
    this.studentValue.get('mobile')?.clearValidators();
    this.studentValue.get('mobile')?.updateValueAndValidity();
    
  }
  get f(){
    return this.studentValue.controls;
  }
}
