import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STPage } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { OrgService } from './org.service';
import { SysOrgOrgEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';

export interface TreeNode {
  id: string;
  orgCode: string;
  orgName: string;
  fullName: string;
  status: string;
  level: number;
  expand: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'app-sys-org',
  templateUrl: './org.component.html',
})
export class SysOrgComponent implements OnInit {
  status = [
    { value: '0', label: '正常', type: 'success' },
    { value: '1', label: '删除', type: 'error' },
    { value: '2', label: '停用', type: 'warning' }
  ];

  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;

  constructor(
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private orgService: OrgService) { }

  listOfMapData = [];
  mapOfExpandedData: { [key: string]: TreeNode[] } = {};

  ngOnInit() {
    this.load();
  }

  load() {
    this.orgService.get().subscribe((data: any) => {
      let nodes = this.genTree("0", data.data);
      console.log(nodes);
      this.listOfMapData = nodes.list.children;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
      })
    });
  }

  //广度优先生成树
  genTree(orgCode: string, data: [any]) {
    let nodes = [...data];
    let node = nodes.find(w => w.orgCode === orgCode);
    let children = nodes.filter(w => (w.parentCode === orgCode));
    if (children.length > 0) {
      node.children = [...children];
      node.children.forEach((item: any) => this.genTree(item.orgCode, data));
    }
    return node;
  }

  add(item?: any) {
    this.modal.createStatic(SysOrgOrgEditComponent, { record: item }).subscribe(() => {
      this.load();
    });
  }

  collapse(array: TreeNode[], data: TreeNode, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNode[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNode, hashMap: { [key: string]: any }, array: TreeNode[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  delete(orgCode: string) {
    this.orgService.delete(orgCode).subscribe(() => {
      this.msgSrv.success('删除成功');
      this.load();
    })
  }

}
