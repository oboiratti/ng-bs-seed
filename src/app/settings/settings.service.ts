import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResponseObject } from '../shared/common-entities.model'
import { environment } from 'src/environments/environment'

export class LookUps {
  static get models() {
    return [
      {
        label: 'Product Category',
        description: 'Manage Product Category',
        name: 'product_category',
        icon: 'fa fa-building text-warning'
      },
      {
        label: 'Package',
        description: 'Manage Package',
        name: 'package',
        icon: 'fa fa-male text-primary'
      }
    ]
  }
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  model: any
  baseApi = environment.apiUrl

  constructor(private httpClient: HttpClient) {}

  fetch(name: string) {
    return this.httpClient.get<[]>(`${this.baseApi}/${name}`)
  }

  save(name: string, params: any) {
    if (params.id) {
      return this.httpClient.put(`${this.baseApi}/${name}`, params)
    }
    return this.httpClient.post(`${this.baseApi}/${name}`, params)
  }

  destroy(name: string, id: number) {
    return this.httpClient.delete(`${this.baseApi}/${name}/delete/${id}`)
  }
}
