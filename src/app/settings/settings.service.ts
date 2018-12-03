import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../shared/common-entities.model';
import { environment } from 'src/environments/environment';

export class LookUps {
  static get models() {
    return [
      {label: "Product Category", description: "Add, Edit and Delete Product Category", name: "product_category", icon: "fa fa-building text-warning"},
      {label: "Package", description: "Add, Edit and Delete Package", name: "package", icon: "fa fa-male text-primary"},
      // {label: "Educational Level", description: "Add, Edit and Delete Educational Level", name: "education_level", icon: "fa fa-graduation-cap text-danger"},
      // {label: "Type", description: "Add, Edit and Delete Type", name: "type", icon: "fa fa-bandcamp text-success"}
    ];
  }
}

@Injectable()
export class SettingsService {

  model: any;
  baseApi = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  fetch(name: string) {
    return this.httpClient.get<ResponseObject<any>>(`${this.baseApi}/${name}`);
  }

  save(name: string, params: any) {
    if (params.id) return this.httpClient.put<ResponseObject<any>>(`${this.baseApi}/${name}`, params);
    return this.httpClient.post<ResponseObject<any>>(`${this.baseApi}/${name}`, params);
  }

  destroy(name: string, id: number) {
    return this.httpClient.delete<ResponseObject<any>>(`${this.baseApi}/${name}/${id}`);
  }
}
