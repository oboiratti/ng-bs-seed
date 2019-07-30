import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../shared/common-entities.model';
import { Product, ProductQuery } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApi = environment.apiUrl
  totalProducts = 0

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<ResponseObject<Product[]>>(`${this.baseApi}/product`).pipe(map(res => {
      if (res.success) { return res.data }
    }))
  }

  save(params: Product) {
    if (params.id) { return this.httpClient.put<ResponseObject<Product>>(`${this.baseApi}/product`, params) }
    return this.httpClient.post<ResponseObject<Product>>(`${this.baseApi}/product`, params)
  }

  getOne(id: number) {
    return this.httpClient.get<ResponseObject<Product>>(`${this.baseApi}/product/${id}`).pipe(map(res => {
      if (res.success) { return res.data }
    }))
  }

  queryProducts(params: ProductQuery) {
    return this.httpClient.post<ResponseObject<Product[]>>(`${this.baseApi}/subscriber/query`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalProducts = res.total
            return res.data
          }
        })
      )
  }

  remove(id: number) {
    return this.httpClient.delete<ResponseObject<Product>>(`${this.baseApi}/product/${id}`)
  }

  deletePackage(productId: number, packageId: number) {
    return this.httpClient.delete<ResponseObject<Product>>(`${this.baseApi}/productpackage?productId=${productId}&packageId=${packageId}`)
  }

  getProductPackages(productId: number) {
    return this.httpClient.get<ResponseObject<any>>(`${this.baseApi}/product/get-product-packages?productId=${productId}`).pipe(
      map(res => {
        if (res.success) { return res.data }
      }))
  }
}
