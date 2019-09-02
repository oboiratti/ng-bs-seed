import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../shared/common-entities.model';
import { User, UserQuery } from '../../auth/auth.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApi = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  fetch() {
    return this.httpClient.get<User[]>(`${this.baseApi}/account/getusers`)
  }

  query(params: UserQuery) {
    return this.httpClient.post<ResponseObject<User[]>>(`${this.baseApi}/auth/users/query`, params);
  }

  save(params: User) {
    if (params.id) { return this.httpClient.put(`${this.baseApi}/account/updateuser`, params); }
    return this.httpClient.post(`${this.baseApi}/account/createuser`, params);
  }

  destroy(id: number) {
    return this.httpClient.delete(`${this.baseApi}/account/deleteuser?id=${id}`);
  }
}
