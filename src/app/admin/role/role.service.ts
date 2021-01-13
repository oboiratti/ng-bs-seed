import { map } from 'rxjs/operators'
import { Injectable, Inject, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResponseObject } from '../../shared/common-entities.model'
import { Role } from '../../auth/auth.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseApi = environment.apiUrl

  constructor(private httpClient: HttpClient) {}

  fetch() {
    return this.httpClient.get<Role[]>(`${this.baseApi}/account/getroles`)
  }

  claims() {
    return this.httpClient.get<[]>(`${this.baseApi}/account/getclaims`)
  }

  save(role: Role) {
    if (role.id) {
      return this.httpClient.put(`${this.baseApi}/account/updaterole`, role)
    }
    return this.httpClient.post(`${this.baseApi}/account/createrole`, role)
  }

  destroy(id: string) {
    return this.httpClient.delete(`${this.baseApi}/account/deleterole?id=${id}`)
  }
}
