import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {


  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput!: ElementRef;
  fileInputLabel: any;
  file !: File;
  arrayBuffer: any;
  filelist: any;
  filelist1: Array<any> = [];
  data: any;
  myfile = '^[A-z]{4}[0-9]{7}$';
  error: any[] = [];

  //formsubmit!: boolean;
  studentValue!: FormGroup
  submitted = false;

  studentObj: StudentModel = new StudentModel;
  studentList: any = [];
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  success: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }


  ngOnInit(): void {
    this.studentValue = this.formBuilder.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]

    })

    this.getStudent();
  }

  profile() {
    // debugger;
    this.http.post<any>("http://localhost:3000/profile", this.filelist.value)
      .subscribe(res => {
        //alert("Register successfully");
        //this.studentValue.reset();
        //this.router.navigate(['login']);
      }, err => {
        // alert("Something went wrong")
      })

  }

  onFileSelect(event: any) {
    //debugger;
    // let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    // if (event.target.files.length > 0) {
    //   // //     const file = event.target.files[0];
    // if (!_.includes(af, event.target.files.type)) {
    //         alert('Only EXCEL Docs Allowed!');
    //       } else {
    //         this.fileInputLabel = this.file.name;
    //         this.studentValue.get('myfile').setValue(file);
    //       }
    //     }

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
     // debugger
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = arraylist;
      // console.log(this.filelist);



    }

  }


  onFormSubmit() {


    localStorage.setItem('x', JSON.stringify(this.filelist));

    // this.getdata();
    console.log("------");
    this.filelist.forEach((element: any) => {
      //alert(JSON.stringify(element))
     // debugger
      if ((element.Containernumber != null && element.Containernumber != '') && (element.Port != null && element.Port != '') && (element.shipmentdata != null && element.shipmentdata != '') && (element.Containernumber.match(this.myfile))) {
        this.filelist1.push(element);
      }

      else {
        this.error.push(element)
      }

    });

    console.log(this.error)
    XLSX.utils.json_to_sheet(this.error)
    this.success = this.filelist.length - this.error.length;
   // alert("Success:" + this.success + ",Failed:" + this.error.length);
    console.log(this.success);
     this.exportToExcel();
  }

  getdata() {
    //debugger
    this.data = localStorage.getItem('x');
    this.data = JSON.parse(this.data);


    // for(let i=0;i<this.data[0].length;i++){
    // if(this.data[0][1] == null || this.data[0][1] == null){
    //   console.log(true);
    // }
    // else{
    //   console.log(false);
    // }
    // }
   // debugger
    // for (let i = 0; i < this.data[0].length; i++) {
    //   debugger
    //   if (this.data[0][i]['Container number'] == '' || this.data[0][i]['Port'] == '' || this.data[0][i]['shipment data'] == '') {
    //     //console.log(this.data[0][i]);
    //     debugger
    //     this.error.push({
    //       "Container_number": this.data[0][i]['Container number'],
    //       "Port_Name": this.data[0][i]['Port'],
    //       "shipment_data": this.data[0][i]['shipment data']
    //     })


    //   }
    //   else if (!this.data[0][i]['Container number'].match(this.myfile)) {
    //     //console.log(this.data[0][i]);
    //     this.error.push({
    //       "Container_number": this.data[0][i]['Container number'],
    //       "Port_Name": this.data[0][i]['Port'],
    //       "shipment_data": this.data[0][i]['shipment data']
    //     })
    //   }


    // }
    console.log(this.error);
    localStorage.setItem('errorlist', JSON.stringify(this.error));
  }

  exportToExcel() {
    //debugger
    const fileName = 'errorList.xlsx';

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.error);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'test');

    XLSX.writeFile(wb, fileName);
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

  editStudent(data: any) {
    // debugger;
    this.showUpdate();
    this.studentValue.controls["name"].setValue(data.name);
    this.studentValue.controls["class"].setValue(data.class);
    this.studentValue.controls["email"].setValue(data.email);
    this.studentValue.controls["mobile"].setValue(data.mobile)
    this.studentObj.id = data.id;


  }
  reset() {
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

  showSave() {
    this.btnSaveShow = true;
    this.btnUpdateShow = false;
  }

  showUpdate() {
    this.btnSaveShow = false;
    this.btnUpdateShow = true;
  }

  logout() {
    // debugger;
    localStorage.removeItem("user");
    this.router.navigate(["/login"])
  }


  onSubmit() {
    this.submitted = true;
    if (this.studentValue.invalid) {
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
  get f() {
    return this.studentValue.controls;
  }
}
