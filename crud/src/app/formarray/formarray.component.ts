import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from './City';
import { Country } from './country';
import { State } from './state';

@Component({
  selector: 'app-formarray',
  templateUrl: './formarray.component.html',
  styleUrls: ['./formarray.component.css']
})
export class FormarrayComponent implements OnInit {

  form : FormGroup;

  submitted = false;

  countries : Country[];
  states : State[];
  city : City[];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['',Validators.required],
      surname: ['',Validators.required],
      college: ['',Validators.required],
      class: ['',Validators.required],
      country: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      skills: this.fb.array([]),
    });
  }

  get skills(): FormArray {
    return this.form.get("skills") as FormArray
  }

  newskill(): FormGroup {
    return this.fb.group({
      skill: [''],
      exp: [''],
    })
  }

  addskills() {
    this.skills.push(this.newskill());
  }

  removeskill(i: number) {
    this.skills.removeAt(i);
  }

  onsubmit() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    alert(JSON.stringify(this.form.value));
  }

  onSelect(e: any) {
    this.states = this.getStates()
      .filter((item) => item.countryname == e.target.value);
  }
  Select(e: any) {
    this.city = this.getCity().filter((item) => item.statename == e.target.value)
  }


  getCountries() {
    return [
      new Country(1, 'India'),
      new Country(2, 'USA'),
      new Country(3, 'UK')
    ];
  }
  getCity() {
    return [
      new City(1, 'Maharasthra', 'Kolhapur'),
      new City(2, 'Maharasthra', 'Satara'),
      new City(3, 'Maharasthra', 'Pune'),
      new City(4, 'Delhi', 'Firozabad'),
      new City(5, 'Delhi', 'Shergarh'),
      new City(6, 'California', 'Los Andeles'),
      new City(7, 'California', 'San Diego'),
      new City(8, 'New York', 'Buffalo'),
      new City(9, 'New York', 'Rochester'),
      new City(10, 'England', 'liverpool'),
      new City(11, 'England', 'Manchester'),
      new City(12, 'Wales', 'Bangor'),
      new City(13, 'Wales', 'St Davids'),

    ]
  }
  getStates() {
    return [
      new State(1, 'India', 'Maharasthra'),
      new State(2, 'India', 'Delhi'),
      new State(3, 'USA', 'California'),
      new State(4, 'USA', 'New York'),
      new State(5, 'UK', 'England'),
      new State(6, 'UK', 'Wales'),
    ];
  }

  get f(){
    return this.form.controls;
  }


  ngOnInit(): void {
    this.countries = this.getCountries();
  }

}
