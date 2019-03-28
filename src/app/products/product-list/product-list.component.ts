import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { Route } from '../../shared/constants';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>

  @BlockUI() blockUi: NgBlockUI;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.getProducts()
  }

  openForm() {
    this.router.navigateByUrl(Route.productForm)
  }

  viewProduct(id: number) {
    this.router.navigate([Route.productDetailsView, id])
  }

  private getProducts() {
    this.blockUi.start("Loading...")
    this.products$ = this.productService.getAll().pipe(
      finalize(() => this.blockUi.stop())
    )
  }
}
