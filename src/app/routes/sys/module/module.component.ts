import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SysModuleEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-sys-module',
  templateUrl: './module.component.html',
})
export class SysModuleComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: { type: 'string', title: '编号' },
      sDate: { type: 'string', ui: { widget: 'date', mode: 'range' } }
    }
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static', component: SysModuleEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { 
    
  }

  add() {
    this.modal
      .createStatic(SysModuleEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  sfHidden = false;
  searchBtnToggle() {
    this.sfHidden = !this.sfHidden;
  }

}
