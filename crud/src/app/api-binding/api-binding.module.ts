import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIComponent } from './api/api.component';
import { InfoComponent } from './info/info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    APIComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
   ReactiveFormsModule
  ]
})
export class APIBindingModule { }
