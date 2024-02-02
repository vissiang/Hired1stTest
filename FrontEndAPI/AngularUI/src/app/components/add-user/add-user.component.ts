import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  idParam: string = '';
  userId: string ='';
  addUserForm!: FormGroup;
  public emailAddress!:string;
  public isValidEmail!: boolean;

  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router, private route: ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstName: [],
      lastName: [],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.route.paramMap.subscribe({
      next:(params) =>{
        const userIdParam = params.get('userId');
        this.userId = userIdParam == null ? '' : userIdParam.toString();
        if(userIdParam){
          //call getUserbyUserID
        }else{
          console.log("No ID passed");
        }
      }
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onAddUser(){
    if(this.addUserForm.valid){

      //send to DB
      this.auth.signUp(this.addUserForm.value).subscribe({
        next:(res=>{
          console.log(res.message);
          this.addUserForm.reset();
          this.router.navigate(['/users', this.userId]);
          alert(res.message);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      });

    }else{

      ValidateForm.validateAllFormFields(this.addUserForm);
      alert("Your form is invalid");
    }
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern =  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

}
