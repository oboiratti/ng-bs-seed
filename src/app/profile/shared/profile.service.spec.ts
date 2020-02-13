import { TestBed, inject } from '@angular/core/testing'

import { ProfileService } from './profile.service'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

describe('ProfileService', () => {
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],
      imports: [HttpClientTestingModule]
    })

    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', inject(
    [ProfileService],
    (service: ProfileService) => {
      expect(service).toBeTruthy()
    }
  ))
})
