import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs';
import { Product } from '../shared/product.model';
import { finalize } from 'rxjs/operators';
import { Route } from 'src/app/shared/constants';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;
  product$: Observable<Product>

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.getProduct(id)
    }
  }

  closeForm() {
    this.router.navigateByUrl(Route.product)
  }

  editProduct(id: number) {
    this.router.navigate([Route.productForm, id])
  }

  private getProduct(id: number) {
    this.blockUi.start("Loading...")
    this.product$ = this.productService.getOne(id).pipe(
      finalize(() => this.blockUi.stop())
    )
  }

}
