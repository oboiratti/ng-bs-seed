import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product, ProductQuery } from '../shared/product.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { Route } from '../../shared/constants';
import { Observable, Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products$: Observable<Product[]>
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <ProductQuery>{};
  name = ''
  lastFilter: ProductQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.getProducts(<ProductQuery>{})
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.router.navigateByUrl(Route.productForm)
  }

  viewProduct(id: number) {
    this.router.navigate([Route.productDetailsView, id])
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.products$ = this.productService.queryProducts(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getProducts(filter: ProductQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...')
    this.products$ = this.productService.queryProducts(filter).pipe(
      finalize(() => {
        this.totalRecords = this.productService.totalProducts
        this.blockUi.stop()
      })
    )
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getProducts(this.filter)
  }
}
