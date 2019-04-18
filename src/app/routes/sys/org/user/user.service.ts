import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: _HttpClient) { }
    
    getUsersByOrg(orgCode: string): Observable<any> {
        return this.http.get(`/sys/user/org/${orgCode}`);
    }

    save(value: any): Observable<any> {
        let res: Observable<any>;
        let id = value.id;
        if (id === undefined) {
            res = this.http.post(`/sys/user`, value);
        } else {
            res = this.http.put(`/sys/user/${value.id}`, value);
        }
        return res;
    }
}