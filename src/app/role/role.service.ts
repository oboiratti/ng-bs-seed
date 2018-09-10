import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../shared/common-entities.model';
import { Role } from '../auth/auth.model';
import { environment } from '../../environments/environment';

@Injectable()
export class RoleService{

  baseApi = environment.apiUrl
 
  constructor(private httpClient: HttpClient) {}

    fetch() {
      return this.httpClient.get<ResponseObject<Role[]>>(`${this.baseApi}/role`);
    }

    permissions() {
      return this.httpClient.get<ResponseObject<any[]>>(`${this.baseApi}/role/permissions`);
    }

    save(role: Role) {
      if (role.id) return this.httpClient.put<ResponseObject<Role>>(`${this.baseApi}/role`, role);
      return this.httpClient.post<ResponseObject<Role>>(`${this.baseApi}/role`, role);
    }

    destroy(id: number) {
      return this.httpClient.delete<ResponseObject<Role>>(`${this.baseApi}/role/${id}`);
    }
}
