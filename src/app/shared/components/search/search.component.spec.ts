import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchComponent } from './search.component'
import { FormBuilder } from '@angular/forms'
import { SearchService } from './search.service'

describe('SearchComponent', () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>
  let searchServiceStub: Partial<SearchService>

  beforeEach(async(() => {
    searchServiceStub = {}

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        { provide: FormBuilder },
        { provide: SearchService, useValue: searchServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
