import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileFormComponent } from './profile-form.component'
import { FormBuilder } from '@angular/forms'
import { AuthService } from 'src/app/auth/auth.service'
import { ProfileService } from '../shared/profile.service'
import { of } from 'rxjs'
import { Profile } from '../shared/profile.model'

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent
  let fixture: ComponentFixture<ProfileFormComponent>
  let authServiceStub: Partial<AuthService>
  let profileServiceStub: Partial<ProfileService>

  beforeEach(async(() => {
    authServiceStub = {
      currentUser: {
        id: 1,
        email: 'test@test.com',
        name: 'Test',
        username: 'test',
        token: 'fas8778fashhfhjafsd',
        image: '',
        role: { id: 1, name: '', claims: [] },
        claims: []
      }
    }

    profileServiceStub = {
      updateProfile: (params: Profile) => of()
    }

    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent],
      providers: [
        { provide: FormBuilder },
        { provide: AuthService, useValue: authServiceStub },
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
