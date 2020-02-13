import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChangePasswordComponent } from './change-password.component'
import { FormBuilder } from '@angular/forms'
import { ProfileService } from '../shared/profile.service'
import { ChangePasswordParams } from '../shared/profile.model'
import { of } from 'rxjs'

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent
  let fixture: ComponentFixture<ChangePasswordComponent>
  let profileServiceStub: Partial<ProfileService>

  beforeEach(async(() => {
    profileServiceStub = {
      changePassword: (params: ChangePasswordParams) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      providers: [
        { provide: FormBuilder },
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
