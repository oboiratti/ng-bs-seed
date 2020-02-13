import { TestBed, inject } from '@angular/core/testing'

import { ProductService } from './product.service'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

describe('ProductService', () => {
  let httpTestingController: HttpTestingController
  let productService: ProductService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule]
    })

    httpTestingController = TestBed.inject(HttpTestingController)
    productService = TestBed.inject(ProductService)
  })

  it('should be created', inject(
    [ProductService],
    (service: ProductService) => {
      expect(service).toBeTruthy()
    }
  ))
})
