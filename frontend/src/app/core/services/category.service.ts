import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from './product.service';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private productService: ProductService,private http: HttpClient, private _api: ApiService, private router: Router) {}

  
  produtos: any = [];

 

  ngOnInit(): void {
    this.productService.read().subscribe(produ => {
      this.produtos = produ; 
    })
   }
}
