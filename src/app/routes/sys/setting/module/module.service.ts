import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: _HttpClient) { }

  get(extraParams?: {}): Observable<any> {
    return  this.http.get(`/sys/module`, extraParams);
  }

  delete(item: any): Observable<any> {
    return  this.http.delete(`/sys/module/${item.id}`);
  }
}
