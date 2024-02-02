import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from "../../models/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [
    /*{
      userId: 'testId',
      firstName: 'test name',
      lastName: 'test name',
      emailAddress: 'test email',
      password: 'test',
      addedDate: null,
      lastUpdatedDate: null
    },
    {
      userId: 'testId',
      firstName: 'test name',
      lastName: 'test name',
      emailAddress: 'test email',
      password: 'test',
      addedDate: null,
      lastUpdatedDate: null
    }*/
  ];
  userId: string = "";
  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next:(params) =>{
        const idParam = params.get('userId');
        this.userId = idParam == null ? '' : idParam.toString();
        if(idParam){
            this.apiService.getProductList(idParam)
            .subscribe({
              next: (productList) =>{
                console.log(productList);
                this.products = productList;
              }
            });
        }else{
          console.log("No User ID passed");
        }
      }
    })
  }

}
