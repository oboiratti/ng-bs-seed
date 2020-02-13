import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductDetailsComponent } from './product-details.component'
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router'
import { ProductService } from '../shared/product.service'
import { of } from 'rxjs'

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent
  let fixture: ComponentFixture<ProductDetailsComponent>
  let productServiceStub: Partial<ProductService>
  let productService: ProductService

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    productServiceStub = {
      getOne: (id: number) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 1
              })
            }
          }
        },
        { provide: ProductService, useValue: productServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    productService = TestBed.inject(ProductService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
