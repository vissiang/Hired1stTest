import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;
  public emailAddress!:string;
  public isValidEmail!: boolean;
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [],
      lastName: [],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp(){
    if(this.signupForm.valid){

      //send to DB
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res=>{
          console.log(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
          alert(res.message);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      });

    }else{

      ValidateForm.validateAllFormFields(this.signupForm);
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
