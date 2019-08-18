import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable, Subject } from 'rxjs';
import { NzTreeNodeOptions } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class OrgService {
    constructor(private http: _HttpClient) { }

    baseUrl = "system/v1/org";

    get(extraParams?: {}): Observable<any> {
        return this.http.get(`${this.baseUrl}/all`, extraParams);
    }

    getByCode(orgCode: string, extraParams?: {}): Observable<any> {
        return this.http.get(`${this.baseUrl}/${orgCode}`, extraParams);
    }

    getChildren(orgCode: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${orgCode}/children`);
    }

    save(value: any): Observable<any> {
        let res: Observable<any>;
        let id = value.id;
        if (id === undefined) {
            res = this.http.post(`${this.baseUrl}`, value);
        } else {
            res = this.http.put(`${this.baseUrl}/${value.orgCode}`, value);
        }
        return res;
    }

    delete(orgCode: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${orgCode}`);
    }

    getOrgTreeByParent(parentOrgCode: string = '0'): Observable<any[]> {
        let nodes = [];
        var subject = new Subject<any[]>();
        this.getChildren(parentOrgCode).subscribe((ret: any) => {
          let children = ret.data;
          children.forEach((item: any) => {
            nodes.push({ title: item.orgName, key: item.orgCode })
          });
          subject.next(nodes);
        });
        return  subject.asObservable();;
      }

    //广度优先生成树
    genTree(orgCode: string, data: [any]) {
        let nodes = [...data];
        let node = nodes.find(w => w.orgCode === orgCode);
        let children = nodes.filter(w => (w.parentOrgCode === orgCode));
        if (children != undefined && children.length > 0) {
            node.children = [...children];
            node.children.forEach((item: any) => this.genTree(item.orgCode, data));
        }
        return node;
    }
}