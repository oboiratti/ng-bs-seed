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
    this.blockUi.start("Saving Product...")

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

  getProduct(id: number) {
    this.blockUi.start("Loading...")
    this.productService.getOne(id).subscribe((res) => {
      this.blockUi.stop()
      if (res.success) {
        this.productForm.patchValue(res.data)
      }
    })
  }

  compareProducts(obj1: Product, obj2: Product): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  closeForm() {
    this.router.navigateByUrl(Route.product)
  }

  remove(id: number) {
    MessageDialog.confirm("Delete Product", "Are you sure you want to delete this product?").then(confirm => {
      if (confirm.value) {
        this.blockUi.start("Deleting Product...")
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

  private buildForm() {
    this.productForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      barcode: new FormControl(''),
      description: new FormControl(''),
      maximumStock: new FormControl(''),
      reorderLevel: new FormControl(''),
      productCategory: new FormControl('', Validators.required),
    })

    this.packageForm = this.fb.group({
        // product: new FormControl({id: 28}),
        pakage: new FormControl('', Validators.required),
        description: new FormControl(),
        quantity: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required)
      })
  }

  private loadCategories() {
    this.settingsService.fetch("product_category").subscribe((res) => {
      if (res.success) {
        this.categories = res.data
      }
    })
  }

  private loadPackages() {
    this.settingsService.fetch("package").subscribe((res) => {
      if (res.success) {
        this.packages = res.data
      }
    })
  }
}
