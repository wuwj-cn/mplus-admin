import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: _HttpClient) { }

  get(extraParams?: {}): Observable<any> {
    return this.http.get(`/sys/menu`, extraParams);
  }

  getByCode(menuCode: string, extraParams?: {}): Observable<any> {
    return this.http.get(`/sys/menu/${menuCode}`, extraParams);
  }

  getChildren(menuCode: string): Observable<any> {
    return this.http.get(`/sys/menu/${menuCode}/children`);
  }

  save(value: any): Observable<any> {
    let res: Observable<any>;
    let menuCode = value.menuCode;
    if ( menuCode === undefined ) {
      res = this.http.post(`/sys/menu`, value);
    } else {
      res = this.http.put(`/sys/menu/${menuCode}`, value);
    }
    return res;
  }

  delete(menuCode: string): Observable<any> {
    return  this.http.delete(`/sys/menu/${menuCode}`);
  }
}
