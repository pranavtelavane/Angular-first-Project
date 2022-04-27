import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  newform : FormGroup;
  list: any = [];
  refno: any;
  moduleid: any;

  constructor(private fb: FormBuilder, private Service: ApiService) { }

  ngOnInit(): void {
    this.newform = this.fb.group({
      refno: [''],
      moduleid: ['']
    })
  }

  search() {
    this.refno = this.newform.controls["refno"].value;
    this.moduleid = this.newform.controls["moduleid"].value;
    console.log(this.newform.controls["refno"].value);
    debugger
    this.Service.getData(this.refno,this.moduleid).subscribe(res => {
      debugger
      this.list = res;
      console.log(this.list);
    })
  }

}
