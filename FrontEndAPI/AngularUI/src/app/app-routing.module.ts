import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './components/login/login.component';
import{SignupComponent} from './components/signup/signup.component';
import{DashboardComponent} from './components/dashboard/dashboard.component';
import{UsersListComponent} from './components/users-list/users-list.component';
import { AddUserComponent } from "./components/add-user/add-user.component";
import{EditUserComponent} from "./components/edit-user/edit-user.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component'

const routes: Routes = [
{path:'', component: LoginComponent},
{path:'login', component: LoginComponent},
{path:'signup', component: SignupComponent},
{path:'dashboard/:userId', component: DashboardComponent},
{path:'users/:userId', component: UsersListComponent},
{path:'users/Add/:userId', component: AddUserComponent},
{path:'users/Edit/:userIdOG/:userId', component: EditUserComponent},
{path:'products/:userId', component: ProductsListComponent},
{path:'products/Add/:userId', component: AddProductComponent},
{path:'products/Edit/:productId', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
