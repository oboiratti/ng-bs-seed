import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductListComponent } from './product-list.component'
import { Router } from '@angular/router'
import { ProductService } from '../shared/product.service'
import { of } from 'rxjs'
import { ProductQuery } from '../shared/product.model'

describe('ProductListComponent', () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>
  let productServiceStub: Partial<ProductService>

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])

    productServiceStub = {
      queryProducts: (params: ProductQuery) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ProductService, useValue: productServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
