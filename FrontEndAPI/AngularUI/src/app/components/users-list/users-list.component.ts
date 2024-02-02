import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from "../../models/product.model";
import {User} from 'src/app/models/user.model'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [
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
          this.apiService.getUserList().subscribe({
            next: (userList) =>{
              //console.log(userList);
              this.users = userList;
            },
            error: (response) =>{
              console.log(response);
            }
          });
        }else{
          console.log("No User ID passed");
        }
      }
    })



  }

}
