import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SysSettingModuleEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-sys-module',
  templateUrl: './module.component.html',
})
export class SysModuleComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      moduleName: {
        type: 'string',
        title: '模块名称'
      },
      moduleCode: {
        type: 'string',
        title: '模块编码'
      },
      status: {
        type: 'string',
        title: '状态'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '模块名称', index: 'moduleName' },
    { title: '模块编码', index: 'moduleCode' },
    { title: '模块描述', index: 'desc' },
    { title: '版本', index: 'version' },
    { title: '状态', index: 'status' },
    {
      title: '操作',
      width: '150px',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', click: (record: any, modal: any) => {
          this.add();
        } }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal.createStatic(SysSettingModuleEditComponent, { i: { id: 0 } }).subscribe(res => {
    });
  }

}
