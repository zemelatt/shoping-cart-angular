import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddCatagoryComponent } from './pages/add-catagory/add-catagory.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './components/protected-rout/protected-rout.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import path from 'node:path';
import { CheckoutComponent } from './pages/checkout/checkout.component';
export const routes = [
  {
    path: 'add-product',
    loadComponent: () =>
      import('./pages/add-product/add-product.component').then(
        (c) => c.AddProductComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'add-catagory',
    component: AddCatagoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'all-products',
    component: AllProductsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['null'] },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['null'] },
  },
];
@NgModule({
  imports: [
    StoreModule.forRoot({ counter: counterReducer }),

    EffectsModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
