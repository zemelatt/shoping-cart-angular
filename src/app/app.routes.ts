import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCatagoryComponent } from './add-catagory/add-catagory.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './protected-rout/protected-rout.component';
export const routes = [
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-catagory',
    component: AddCatagoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
