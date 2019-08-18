import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { OrgService } from '../org/org.service';
import { SysOrgUserEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-sys-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class SysUserComponent implements OnInit {
  url = `system/v1/user`;
  searchSchema: SFSchema = {
    properties: {
      userId: { type: 'string', title: '登录账号' },
      userName: { type: 'string', title: '用户名称' },
      email: { type: 'string', title: '电子邮箱' }
    }
  };
  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '登录账号', index: 'userId' },
    { title: '用户昵称', index: 'nickName' },
    { title: '用户名称', index: 'userName' },
    { title: '组织机构', index: 'orgName' },
    { title: '电子邮箱', index: 'email' },
    { title: '状态', index: 'dataStatus' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(
    private http: _HttpClient, 
    private modal: ModalHelper,
    private orgService: OrgService) { }

  isCollapsed = false;
  searchValue = '';
  nodes = [];

  ngOnInit() { 
    this.getOrgTree();
  }

  getOrgTree() {
    this.orgService.get().subscribe((res: any) => {
      let nodes = []
      let tree = this.orgService.genTree("0", res.data);
      tree.children.forEach((node: any) => {
        nodes.push(this.convertTree(node));
      });
      this.nodes = nodes;
    });
  }

  convertTree(node: any): NzTreeNodeOptions {
    let result: NzTreeNodeOptions = {title: node.orgName, key: node.orgCode, children: [], expanded: false};
    if(node.children != undefined && node.children.length !== 0) {
        node.children.forEach((item: any) => {
            result.children.push(this.convertTree(item));
        });
    }
    if(node.children != undefined && result.children.length == 0) result.isLeaf = true;
    return result;
  }

  add(item?: any) {
    this.modal.createStatic(SysOrgUserEditComponent, { record: item }).subscribe(() => {
      this.st.reload()
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
