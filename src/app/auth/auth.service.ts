import { Injectable, Inject } from '@angular/core';
import { User, LoginParams } from './auth.model';
import { ResponseObject } from '../shared/common-entities.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  currentUser: User
  loggedInSource = new Subject<boolean>()
  loggedIn$ = this.loggedInSource.asObservable()
  baseApi = environment.apiUrl

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  authenticate(params: LoginParams) {
    return this.httpClient.post<ResponseObject<User>>(`${this.baseApi}/account/login`, params)
  }

  invalidate() {
    return this.httpClient.get<ResponseObject<User>>(`${this.baseApi}/account/logout`)
  }

  setUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  removeUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() { return !!this.currentUser }

  announceLogin(isLoggedIn: boolean) {
    this.loggedInSource.next(isLoggedIn)
  }

  canAccess(privileges: string) {
    const privs = privileges.split('|');
    const found = (this.currentUser.role.privileges as []).filter(value => privs.includes(value))
    return found.length > 0
  }
}
