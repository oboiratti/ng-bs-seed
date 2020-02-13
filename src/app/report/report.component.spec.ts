import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReportComponent } from './report.component'
import { ReportService } from './report.service'
import { of } from 'rxjs'

describe('ReportComponent', () => {
  let component: ReportComponent
  let fixture: ComponentFixture<ReportComponent>
  let reportServiceStub: Partial<ReportService>

  beforeEach(async(() => {
    reportServiceStub = {
      getReport: (url: string, params: any) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ReportComponent],
      providers: [{ provide: ReportService, useValue: reportServiceStub }]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
