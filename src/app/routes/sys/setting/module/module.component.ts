import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STPage, STData } from '@delon/abc';
import { SFSchema, SFUISchema } from '@delon/form';
import { SysSettingModuleEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';
import { ModuleService } from './module.service';

@Component({
  selector: 'app-sys-module',
  templateUrl: './module.component.html',
})

export class SysModuleComponent implements OnInit {
  url = `/sys/module`;

  loading = false;
  expandForm = false;

  status = [
    { value: 0, label: '正常', type: 'success' },
    { value: 1, label: '删除', type: 'error' },
    { value: 2, label: '禁用', type: 'warning' }
  ];

  searchSchema: SFSchema = {
    properties: {
      moduleName: { type: 'string', title: '模块名称' },
      moduleCode: { type: 'string', title: '模块编码' },
      status: { type: 'string', title: '状态', enum: this.status }
    }
  };
 
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 80,
      grid: { span: 6 },
    },
  };

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '模块名称', index: 'moduleName' },
    { title: '模块编码', index: 'moduleCode' },
    { title: '模块描述', index: 'desc' },
    { title: '版本', index: 'version' },
    { title: '状态', index: 'status', render: 'status'},
    {
      title: '操作',
      width: '150px',
      buttons: [
        { text: '编辑', click: (item: any) => this.add(item) },
        { text: '删除', type: 'del', click: (item: any) => this.delete(item) }
      ]
    }
  ];

  page: STPage = {
    show: true,
    showSize: true,
    pageSizes: [5,10,20,50,100]
  }

  constructor(private http: _HttpClient, private modal: ModalHelper, 
    private msgSrv: NzMessageService,
    private moduleService: ModuleService) { }

  ngOnInit() { 
    // const col = this.columns.find(w => w.render === 'status');
    // console.log(col);
  }

  add(item: any) {
    this.modal.createStatic(SysSettingModuleEditComponent, { record: item }).subscribe(res => {
      this.st.reload();
    });
  }

  delete(item: any) {
    this.moduleService.delete(item).subscribe(res => {
      this.st.reload();
      this.msgSrv.success('删除成功');
    });
  }
}
