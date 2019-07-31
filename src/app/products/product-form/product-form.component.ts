import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { SettingsService } from '../../settings/settings.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductService } from '../shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '../../shared/constants';
import { Product, ProductPackage } from '../shared/product.model';
import { MessageDialog } from '../../shared/message_helper';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup
  packageForm: FormGroup
  categories: any[]
  packages: any[]
  productPackages: ProductPackage[] = []
  @BlockUI() blockUi: NgBlockUI;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private productService: ProductService) {
    this.buildForm()
  }

  ngOnInit() {
    this.loadCategories()
    this.loadPackages()
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id)
    }
  }

  save() {
    this.blockUi.start('Saving Product...')

    const params = this.productForm.value
    params.packages = this.productPackages
    this.productService.save(params).subscribe((res) => {
      this.blockUi.stop()
      if (res.success) {
        this.router.navigateByUrl(Route.product)
      }
    }, err => {
      this.blockUi.stop()
    })
  }

  closeForm() {
    this.router.navigateByUrl(Route.product)
  }

  remove(id: number) {
    MessageDialog.confirm('Delete Product', 'Are you sure you want to delete this product?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting Product...')
        this.productService.remove(id).subscribe((res) => {
          this.blockUi.stop()
          if (res.success) {
            this.router.navigateByUrl(Route.product)
          }
        }, err => {
          this.blockUi.stop()
        })
      }
    })
  }

  addPackage() {
    this.productPackages.push(this.packageForm.value)
    this.packageForm.reset()
  }

  deletePackage(productPackage: ProductPackage, index: number) {
    if (!productPackage.id) {
      this.productPackages.splice(index, 1)
      return;
    }

    MessageDialog.confirm('Delete Product Package', 'Are you sure you want to delete this product package?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...')
        this.productService.deletePackage(productPackage.id.product, productPackage.id.pakage).subscribe((res) => {
          this.blockUi.stop()
          if (res.success) {
            this.router.navigateByUrl(Route.product)
          }
        }, err => {
          this.blockUi.stop()
        })
      }
    })
  }

  private buildForm() {
    this.productForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      barcode: new FormControl(''),
      description: new FormControl(''),
      maximumStock: new FormControl(0),
      reorderLevel: new FormControl(0),
      profitMargin: new FormControl(0, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ])),
      productCategory: new FormControl(null, Validators.required),
    })

    this.packageForm = this.fb.group({
      pakage: new FormControl(null, Validators.required),
      description: new FormControl(),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    })
  }

  private getProduct(id: number) {
    this.blockUi.start('Loading...')
    this.productService.getOne(id).subscribe((product) => {
      this.blockUi.stop()
      // if (res.success) {
      this.productForm.patchValue(product)
      this.productPackages = product.packages
      // }
    }, err => {
      this.blockUi.stop()
    })
  }

  private loadCategories() {
    this.settingsService.fetch('product_category').subscribe((res) => {
      if (res.success) {
        this.categories = res.data
      }
    })
  }

  private loadPackages() {
    this.settingsService.fetch('package').subscribe((res) => {
      if (res.success) {
        this.packages = res.data
      }
    })
  }
}
