import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = "system/v1/user";
    constructor(private http: _HttpClient) { }
    
    getUsersByOrg(orgCode: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/org/${orgCode}`);
    }

    save(value: any): Observable<any> {
        let res: Observable<any>;
        let id = value.id;
        console.log(value);
        if (id === undefined) {
            res = this.http.post(`${this.baseUrl}`, value);
        } else {
            res = this.http.put(`${this.baseUrl}/${value.id}`, value);
        }
        return res;
    }
}