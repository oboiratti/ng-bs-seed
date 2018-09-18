import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../shared/common-entities.model';
import { Product } from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseApi = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<ResponseObject<Product[]>>(`${this.baseApi}/product`)
  }

  save(params: Product) {
    if (params.id) return this.httpClient.put<ResponseObject<Product>>(`${this.baseApi}/product`, params)
    return this.httpClient.post<ResponseObject<Product>>(`${this.baseApi}/product`, params)
  }

  getOne(id: number) {
    return this.httpClient.get<ResponseObject<Product>>(`${this.baseApi}/product/${id}`)
  }

  remove(id: number) {
    return this.httpClient.delete<ResponseObject<Product>>(`${this.baseApi}/product/${id}`)
  }
}
