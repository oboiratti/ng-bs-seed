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

  get() {
    return this.httpClient.get<ResponseObject<Product[]>>(`${this.baseApi}/product`)
  }
}
