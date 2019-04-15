import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: _HttpClient) { }

    get(extraParams?: {}): Observable<any> {
        return this.http.get(`/sys/post`, extraParams);
    }

    getByCode(postCode: string, extraParams?: {}): Observable<any> {
        return this.http.get(`/sys/post/${postCode}`, extraParams);
    }

    save(value: any): Observable<any> {
        let res: Observable<any>;
        let id = value.id;
        if (id === undefined) {
            res = this.http.post(`/sys/post`, value);
        } else {
            res = this.http.put(`/sys/post/${value.postCode}`, value);
        }
        return res;
    }

    delete(postCode: string): Observable<any> {
        return this.http.delete(`/sys/org/${postCode}`);
    }
}