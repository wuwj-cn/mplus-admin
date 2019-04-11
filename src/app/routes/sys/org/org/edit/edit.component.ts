import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { OrgService } from '../org.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModuleService } from 'app/routes/sys/setting/module/module.service';

@Component({
  selector: 'app-sys-org-org-edit',
  templateUrl: './edit.component.html',
})
export class SysOrgOrgEditComponent implements OnInit {
  
  @Input() record: any;
  i: any;
  status = [
    { value: '0', label: '正常', type: 'success' },
    { value: '1', label: '删除', type: 'error' },
    { value: '2', label: '停用', type: 'warning' }
  ];

  schema: SFSchema = {
    properties: {
      parentCode: { type: 'string', title: '上级机构' },
      orgCode: { type: 'string', title: '机构编码' },
      orgName: { type: 'string', title: '机构名称' },
      fullName: { type: 'string', title: '机构全称' },
      status: { type: 'string', title: '状态', enum: this.status, default: '0', ui: { widget: 'select'} },
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
      asyncData: () => of(this.getOrgTree()).pipe(delay(300)),
      expandChange: (e: NzFormatEmitEvent) => {
        return of(this.getOrgTree(e.node.key)).pipe(delay(300));
      }
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 24 },
      autosize: { minRows: 2, maxRows: 6 }
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private orgService: OrgService,
    private moduleService: ModuleService
  ) {}
  
  ngOnInit(): void {
    if(this.record !== undefined) {
      this.i = this.record
    } else {
      this.i = {};
    }
  }

  getOrgTree(orgCode: string = '0'): any[] {
    let nodes = [];
    this.orgService.getChildren(orgCode).subscribe((data: any) => {
      data.list.children.forEach((item: any) => {
        nodes.push({ title: item.orgName, key: item.orgCode })
      });
    });
    return nodes;
  }

  save(value: any) {
    this.orgService.save(value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
