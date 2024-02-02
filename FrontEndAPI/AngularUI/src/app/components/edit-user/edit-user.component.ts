import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../../models/user.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  idParam: string = '';
  userIdParam: string ='';
  editUserForm!: FormGroup;
  user: User = {
    userId : '',
    firstName : '',
    lastName : '',
    emailAddress : '',
    password : '',
    addedDate : null,
    lastUpdatedDate : null
  };
  public emailAddress!:string;
  public isValidEmail!: boolean;

  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute, private apiService:ApiService) { }

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      firstName: [],
      lastName: [],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      addedDate: [],
      lastUpdatedDate: [],
      userId: []
    })

    this.router.paramMap.subscribe({
      next:(params) =>{
        const userId = params.get('userId');
        const userIdOG = params.get('userIdOG');
        this.idParam = userId == null ? '' : userId.toString();
        this.userIdParam = userIdOG == null ? '' : userIdOG.toString();
        if(userId){
          //call getUserbyUserID
            this.apiService.getUser(userId)
            .subscribe({
              next: (response) =>{
                //this.user = response;

                this.editUserForm.patchValue({
                  firstName: response.firstName,
                  lastName: response.lastName,
                  emailAddress: response.emailAddress,
                  password: response.password,
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

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onEditUser(){
    if(this.editUserForm.valid){
      this.apiService.updateUser(this.editUserForm.value)
      .subscribe({
        next: (response) => {
          console.log(this.userIdParam);
          this.route.navigate(['/users', this.userIdParam]);
          alert(response.message);
        }
      });
    }else{

      ValidateForm.validateAllFormFields(this.editUserForm);
      alert("Your form is invalid");
    }
  }

  onDeleteUser(userId: string){
    //const id = this.editUserForm.get(userId).value;
    this.apiService.deleteUser(this.idParam)
      .subscribe({
        next: (response) => {
          console.log(this.userIdParam);
          this.route.navigate(['/users', this.userIdParam]);
        }
      });
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern =  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

}
