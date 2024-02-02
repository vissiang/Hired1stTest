import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!:string;
  public isValidEmail!: boolean;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this.loginForm.valid){

      //send to DB
      this.auth.logIn(this.loginForm.value).subscribe({
        next:(res=>{
          alert("Login Successfully");
          //pass userid
          //this.router.navigate(['dashboard'], res.userId)
          console.log(res.userId);
          this.router.navigate(['/dashboard', res.userId])
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      });

    }else{

      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
    }
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern =  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      this.resetPasswordEmail = "";
      const buttonRef = document.getElementById("closeBtn");
      buttonRef?.click();
      //API call
    }
  }

}
