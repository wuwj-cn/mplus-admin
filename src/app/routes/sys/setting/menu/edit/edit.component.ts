import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { ModuleService } from '../../module/module.service';

@Component({
  selector: 'app-sys-setting-menu-edit',
  templateUrl: './edit.component.html',
})
export class SysSettingMenuEditComponent implements OnInit {
  record: any = {};
  i: any = {};
  moduleList: [];
  menuList: [];

  schema: SFSchema = {
    properties: {
      parentMenu: {
        type: 'string', title: '上级菜单', enum: this.menuList, ui: {widget: 'tree-select', expandChange: (e: NzFormatEmitEvent) => {
          
        }}
      },
      menuCode: { type: 'string', title: '菜单编码' },
      menuName: { type: 'string', title: '菜单名称' },
      moduleName: { type: 'string', title: '归属模块', enum: this.moduleList, ui: { widget: 'select'} },
      href: { type: 'string', title: '链接' },
      isVisible: { type: 'string', title: '可见', enum: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' },
      ], default: '0', ui: { widget: 'select' } },
      remark: { type: 'string', title: '备注' }
    },
    required: ['menuCode', 'menuName', 'moduleName', 'href'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 24},
      autosize: { minRows: 2, maxRows: 6 }
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    // if (this.record.id > 0)
    // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
    this.moduleService.get().subscribe();
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
