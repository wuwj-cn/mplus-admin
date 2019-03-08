import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-sys-setting-module-edit',
  templateUrl: './edit.component.html',
})
export class SysSettingModuleEditComponent implements OnInit {
  @Input() record: any = {};
  i: any = {};
  schema: SFSchema = {
    properties: {
      moduleCode: { type: 'string', title: '模块编码' },
      moduleName: { type: 'string', title: '模块名称'},
      version: { type: 'string', title: '版本号' },
      status: { type: 'string', title: '状态'},
      desc: { type: 'string', title: '模块描述' },
    },
    required: ['moduleCode', 'moduleName', 'status'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $desc: {
      widget: 'textarea',
      grid: { span: 24},
      autosize: { minRows: 2, maxRows: 6 }
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record != undefined && this.record.id > 0) {
      this.http.get(`/sys/module/${this.record.id}`).subscribe(res => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record == undefined) {
      this.http.post(`/sys/module`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });      
    } else {
      this.http.put(`/sys/module/${this.record.id}`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
    
  }

  close() {
    this.modal.destroy();
  }
}
