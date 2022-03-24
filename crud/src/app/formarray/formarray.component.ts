import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formarray',
  templateUrl: './formarray.component.html',
  styleUrls: ['./formarray.component.css']
})
export class FormarrayComponent implements OnInit {

  form !: FormGroup;

  constructor(private fb : FormBuilder) {
    this.form = this.fb.group({
      name : '',
      surname : '',
      college :'',
      skills : this.fb.array([]),
    });
   }

   get skills() : FormArray{
     return this.form.get("skills") as FormArray
   }

   newskill() : FormGroup{
     return this.fb.group({
       skill : '',
       exp : '',
     })
   }

   addskills(){
     this.skills.push(this.newskill());
   }

   removeskill(i : number){
     this.skills.removeAt(i);
   }

   onsubmit(){
     alert(JSON.stringify(this.form.value));
   }

  ngOnInit(): void {
  }

}
