import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit {

  res: any;
  set : any;
  searchText : any;

  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this. geturl()
  }

  geturl(){
    let url = 'https://dummyjson.com/products';
       this.http.get(url).subscribe(products => {
        debugger
        this.res=products;
        this.set = this.res.products
        console.log(this.set);
        })
  }

}
