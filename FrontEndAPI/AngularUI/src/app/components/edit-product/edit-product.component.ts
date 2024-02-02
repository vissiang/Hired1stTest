import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from "../../models/product.model";
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  idParam: string = '';
  userIdParam: string ='';
  editProductForm!: FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [],
      addedDate: [],
      lastUpdatedDate: [],
      userId: [],
      productId: []
    })

    this.router.paramMap.subscribe({
      next:(params) =>{
        const productId = params.get('productId');
        this.idParam = productId == null ? '' : productId.toString();
        if(productId){
          //call getUserbyUserID
            this.apiService.getProduct(productId)
            .subscribe({
              next: (response) =>{
                //this.user = response;
                this.userIdParam = response.userId;
                this.editProductForm.patchValue({
                  name: response.name,
                  price: response.price,
                  description: response.description,
                  productId: response.productId,
                  addedDate: response.addedDate,
                  lastUpdatedDate: response.lastUpdatedDate,
                  userId: response.userId
                });
              }
            });
        }else{
          console.log("No ID passed");
        }
      }
    })
  }


  onEditProduct(){
    if(this.editProductForm.valid){
      this.apiService.updateProduct(this.editProductForm.value)
      .subscribe({
        next: (response) => {
          console.log(this.userIdParam);
          this.route.navigate(['/products', this.userIdParam]);
          alert(response.message);
        }
      });
    }else{

      ValidateForm.validateAllFormFields(this.editProductForm);
      alert("Your form is invalid");
    }
  }

  onDeleteProduct(userId: string){
    //const id = this.editUserForm.get(userId).value;
    this.apiService.deleteUser(this.userIdParam)
      .subscribe({
        next: (response) => {
          this.route.navigate(['/products', this.idParam]);
        }
      });
  }

}
