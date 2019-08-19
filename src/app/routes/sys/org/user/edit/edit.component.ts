import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { OrgService } from '../../org/org.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sys-org-user-edit',
  templateUrl: './edit.component.html',
})
export class SysOrgUserEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      orgCode: { type: 'string', title: '归属机构' },
      userId: { type: 'string', title: '登录账号' },
      nickName: { type: 'string', title: '用户昵称' },
      userName: { type: 'string', title: '用户名称' },
      email: { type: 'string', title: '电子邮箱', format: 'email' },
      remark: { type: 'string', title: '备注' },
    },
    required: ['orgCode', 'userId', 'userName', 'email'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $orgCode: {
      widget: 'tree-select', 
      asyncData: () => this.orgService.getOrgTreeByParent(),
      expandChange: (e: NzFormatEmitEvent) => {
        return this.orgService.getOrgTreeByParent(e.node.key);
      }
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 24 },
      autosize: { minRows: 2, maxRows: 6 }
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private userService: UserService,
    private orgService: OrgService
  ) {}

  ngOnInit(): void {
    // if (this.record.id > 0)
    // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
    this.i = {};
  }

  save(value: any) {
    this.userService.save(value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
