import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from '../auth-guard.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { Route } from '../shared/constants';

const routes: Routes = [
  {
    path: Route.product,
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Route.productForm,
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Route.productFormEdit,
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
