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

  delete(item: any): Observable<any> {
    return  this.http.delete(`/sys/menu/${item.id}`);
  }
}
