import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-sys-org-org-edit',
  templateUrl: './edit.component.html',
})
export class SysOrgOrgEditComponent implements OnInit {
  @ViewChild('sf', { static: false }) sf: SFComponent;
  @Input() record: any;
  i: any;
  dataStatus = [
    { value: '0', label: '正常', type: 'success' },
    { value: '1', label: '删除', type: 'error' },
    { value: '2', label: '停用', type: 'warning' }
  ];

  schema: SFSchema = {
    properties: {
      parentOrgCode: { type: 'string', title: '上级机构' },
      orgCode: { type: 'string', title: '机构编码' },
      orgName: { type: 'string', title: '机构名称' },
      fullName: { type: 'string', title: '机构全称' },
      dataStatus: { type: 'string', title: '状态', enum: this.dataStatus, default: '0', ui: { widget: 'select'} },
      remark: { type: 'string', title: '备注' },
    },
    required: ['orgCode', 'orgName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $parentOrgCode: {
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
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private orgService: OrgService
  ) {}
  
  ngOnInit(): void {
    if(this.record !== undefined) {
      this.i = this.record;
      // 以下为临时解决办法，初次赋值时，上级机构不会显示
      setTimeout(() => {
        this.sf.setValue('/parentOrgCode', this.record.parentOrgCode);
      }, 500);
    } else {
      this.i = {};
    }
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
