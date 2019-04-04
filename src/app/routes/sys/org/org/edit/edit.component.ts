import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { OrgService } from '../org.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-sys-org-org-edit',
  templateUrl: './edit.component.html',
})
export class SysOrgOrgEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      parentCode: { type: 'string', title: '上级机构' },
      orgCode: { type: 'string', title: '机构编码' },
      orgName: { type: 'string', title: '机构名称' },
      fullName: { type: 'string', title: '机构全称' },
      status: { type: 'string', title: '状态' },
      remark: { type: 'string', title: '备注' },
    },
    required: ['orgCode', 'orgName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $parentCode: {
      widget: 'tree-select', 
        asyncData: () => of(this.orgList).pipe(delay(300)),
        expandChange: (e: NzFormatEmitEvent) => {
          let nodes = [];
          this.orgService.getChildren(e.node.key).subscribe((data: any) => {
            data.list.children.forEach((item: any) => {
              nodes.push({ title: item.menuName, key: item.menuCode })
            });
          });
          return of(nodes).pipe(delay(300));
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
    private orgService: OrgService
  ) {}

  orgList = [];

  ngOnInit(): void {
    // if (this.record.id > 0)
    // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
    this.i = {};
  }

  save(value: any) {
    this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
