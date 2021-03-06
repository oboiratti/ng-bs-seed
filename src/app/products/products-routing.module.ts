import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './product-list/product-list.component'
import { AuthGuard } from '../auth-guard.service'
import { ProductFormComponent } from './product-form/product-form.component'
import { Route } from '../shared/constants'
import { ProductDetailsComponent } from './product-details/product-details.component'

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
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
  },
  {
    path: Route.productDetails,
    component: ProductDetailsComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
