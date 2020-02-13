import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReportFilterComponent } from './report-filter.component'
import { ReportFilterService } from './report-filter.service'
import { of } from 'rxjs'

describe('ReportFilterComponent', () => {
  let component: ReportFilterComponent
  let fixture: ComponentFixture<ReportFilterComponent>
  let reportFilterServiceStub: Partial<ReportFilterService>

  beforeEach(async(() => {
    reportFilterServiceStub = {
      fetch: (url: string) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ReportFilterComponent],
      providers: [
        { provide: ReportFilterService, useValue: reportFilterServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
