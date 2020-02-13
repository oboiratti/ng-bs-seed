import { TestBed, inject } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '../../../../node_modules/@angular/common/http/testing'

import { RoleService } from './role.service'
import { Role } from '../../auth/auth.model'

describe('RoleService', () => {
  let roleService: RoleService
  let httpTestingController: HttpTestingController

  const roles: Role[] = [
    { id: 1, name: 'role1', claims: ['perm1', 'perm2'] },
    { id: 2, name: 'role2', claims: ['perm1', 'perm2'] },
    { id: 3, name: 'role3', claims: ['perm1', 'perm2'] }
  ]
  const role = { id: 1, name: 'role1', claims: ['perm1', 'perm2'] }

  const expectedRolesResponse = {
    success: true,
    data: roles,
    message: 'Roles loaded',
    total: 1
  }

  const expectedNoRolesResponse = []

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleService],
      imports: [HttpClientTestingModule]
    })

    roleService = TestBed.inject(RoleService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(roleService).toBeTruthy()
  })

  describe('#fetch', () => {
    it('should return array with expected roles', () => {
      roleService.fetch().subscribe(data => {
        expect(data.length).toBeGreaterThan(0)
      })

      const req = httpTestingController.expectOne('api/account/getroles')
      expect(req.request.method).toBe('GET')

      req.flush(roles)
    })

    it('should be ok with empty array', () => {
      roleService.fetch().subscribe(data => {
        expect(data).toEqual([])
        expect(data.length).toEqual(0)
      })

      const req = httpTestingController.expectOne('api/account/getroles')
      expect(req.request.method).toBe('GET')

      req.flush(expectedNoRolesResponse)
    })
  })

  describe('#permissions', () => {})

  describe('#save', () => {})

  describe('#destroy', () => {})
})
