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
  value: any;

  constructor(private fb: FormBuilder, private Service: ApiService) { }

  ngOnInit(): void {
    this.newform = this.fb.group({
      search: ['']
    })
  }

  search() {
    this.value = this.newform.controls["search"].value;
    console.log(this.newform.controls["search"].value);
    debugger
    this.Service.getData(this.value).subscribe(res => {
      debugger
      this.list = res;
      console.log(this.list);
    })
  }

}
