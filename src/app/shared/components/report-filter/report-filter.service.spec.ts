import { TestBed } from '@angular/core/testing'

import { ReportFilterService } from './report-filter.service'
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing'

describe('ReportFilterService', () => {
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })

    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    const service: ReportFilterService = TestBed.inject(ReportFilterService)
    expect(service).toBeTruthy()
  })
})
