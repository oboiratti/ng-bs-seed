import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../shared/common-entities.model';
import { Role } from '../../auth/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService{

  private baseApi = environment.apiUrl
 
  constructor(private httpClient: HttpClient) {}

    fetch() {
<<<<<<< HEAD:src/app/admin/role/role.service.ts
      return this.httpClient.get<ResponseObject<Role[]>>(`${this.baseApi}/role`).map(res => {
        if (res.success) return res.data
      });
=======
      return this.httpClient.get<ResponseObject<Role[]>>(`${this.baseApi}/role`);
>>>>>>> 954bef8aaf5e71f637fb2b4ff27330c1d8187577:src/app/role/role.service.ts
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
