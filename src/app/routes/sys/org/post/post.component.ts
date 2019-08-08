import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-sys-post',
  templateUrl: './post.component.html',
})
export class SysPostComponent implements OnInit {
  url = `/sys/post`;
  searchSchema: SFSchema = {
    properties: {
      postName: {
        type: 'string',
        title: '岗位名称'
      }
    }
  };
  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '岗位名称', index: 'postName' },
    { title: '岗位编码', index: 'postCode' },
    { title: '岗位分类', index: 'postType' },
    { title: '状态', index: 'status' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
