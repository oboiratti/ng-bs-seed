import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductFormComponent } from './product-form.component'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router'
import { SettingsService } from 'src/app/settings/settings.service'
import { ProductService } from '../shared/product.service'
import { of } from 'rxjs'

describe('ProductFormComponent', () => {
  let component: ProductFormComponent
  let fixture: ComponentFixture<ProductFormComponent>
  let productServiceStub: Partial<ProductService>
  let settingsServiceStub: Partial<SettingsService>

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])

    productServiceStub = {
      getOne: (id: number) => of()
    }

    settingsServiceStub = {
      fetch: (name: string) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      providers: [
        { provide: FormBuilder },
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
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: ProductService, useValue: productServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
