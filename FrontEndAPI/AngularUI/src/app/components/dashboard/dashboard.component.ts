import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helper/ValidateForm';
import {AuthService} from './../../services/auth.service';
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../../models/user.model";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId: string = "";
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        const idParam = params.get('userId');
        this.userId = idParam == null ? '' : idParam.toString();
        if(idParam){
          //call getUserbyUserID

        }else{
          console.log("No ID passed");
        }
      }
    })
  }

}
