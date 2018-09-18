import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { Route } from '../../shared/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[]
  @BlockUI() blockUi: NgBlockUI;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.getProducts()
  }

  openForm() {
    this.router.navigateByUrl(Route.productForm)
  }

  editProduct(id: number) {
    this.router.navigate([Route.productForm, id])
  }

  private getProducts() {
    this.blockUi.start("Loading...")
    this.productService.getAll().subscribe((res) => {
      this.blockUi.stop()
      if (res.success) {
        this.products = res.data
      }
    }, err => {
      this.blockUi.stop()
    })
  }
}
