import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  idParam: string = '';
  userId: string ='';
  addProductForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router, private route: ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [],
      addedDate: [],
      lastUpdatedDate: [],
      userId: [],
      productId: []
    })

    this.route.paramMap.subscribe({
      next:(params) =>{
        const userIdParam = params.get('userId');
        this.userId = userIdParam == null ? '' : userIdParam.toString();
        if(userIdParam){
          this.addProductForm.patchValue({userId: this.userId});
        }else{
          console.log("No ID passed");
        }
      }
    })
  }

  onAddProduct(){
    if(this.addProductForm.valid){
      console.log(this.addProductForm.value);
      //send to DB
      this.apiService.addProduct(this.addProductForm.value).subscribe({
        next:(res=>{
          console.log(res.message);
          this.addProductForm.reset();
          this.router.navigate(['/products', this.userId]);
          alert(res.message);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      });

    }else{

      ValidateForm.validateAllFormFields(this.addProductForm);
      alert("Your form is invalid");
    }
  }

}
