import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrgService {
    constructor(private http: _HttpClient) { }

    get(extraParams?: {}): Observable<any> {
        return this.http.get(`/sys/org`, extraParams);
    }

    getByCode(orgCode: string, extraParams?: {}): Observable<any> {
        return this.http.get(`/sys/org/${orgCode}`, extraParams);
    }

    getChildren(orgCode: string): Observable<any> {
        return this.http.get(`/sys/org/${orgCode}/children`);
    }

    save(value: any): Observable<any> {
        let res: Observable<any>;
        let orgCode = value.orgCode;
        if (orgCode === undefined) {
            res = this.http.post(`/sys/org`, value);
        } else {
            res = this.http.put(`/sys/org/${orgCode}`, value);
        }
        return res;
    }

    delete(orgCode: string): Observable<any> {
        return this.http.delete(`/sys/org/${orgCode}`);
    }
}