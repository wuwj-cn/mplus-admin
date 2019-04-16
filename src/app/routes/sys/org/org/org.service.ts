import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { NzTreeNodeOptions } from 'ng-zorro-antd';

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
        let id = value.id;
        if (id === undefined) {
            res = this.http.post(`/sys/org`, value);
        } else {
            res = this.http.put(`/sys/org/${value.orgCode}`, value);
        }
        return res;
    }

    delete(orgCode: string): Observable<any> {
        return this.http.delete(`/sys/org/${orgCode}`);
    }

    /**
     * 返回结果不包含根节点
     */
    getOrgTree(result: NzTreeNodeOptions[]) {
        this.get().subscribe(res => {
            res.list.children.forEach((node: any) => {
                result.push(this.convertTree(node));
            });
        });
    }

    private convertTree(node: any): NzTreeNodeOptions {
        let result: NzTreeNodeOptions = {title: node.orgName, key: node.orgCode, children: [], expanded: false};
        if(node.children.length !== 0) {
            node.children.forEach((item: any) => {
                result.children.push(this.convertTree(item));
            });
        }
        if(result.children.length == 0) result.isLeaf = true;
        return result;
    }
}