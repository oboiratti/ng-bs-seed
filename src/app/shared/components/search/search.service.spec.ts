import { TestBed, inject } from '@angular/core/testing'

import { SearchService } from './search.service'
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing'

describe('SearchService', () => {
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [HttpClientTestingModule]
    })

    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy()
  }))
})
