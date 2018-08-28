import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SysModuleEditComponent } from './edit/edit.component';
import { I18NService } from '@core/i18n/i18n.service';
import { NzModalService } from 'ng-zorro-antd';
import { Result } from '@core/result';
import { map, tap } from 'rxjs/operators';

enum Status {
  NORMAL = 0,
  DELETED = 1,
  DISABLED = 2
}

@Component({
  selector: 'app-sys-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.less'],
})
export class SysModuleComponent implements OnInit {

  @Input() page = 0;
  @Input() size = 10;
  dataSet: any[] = [];
  loading = false;
  sfHidden = true;
  isCollapse = true;

  status = [
    { text: '正常', value: '0', type: 'success' },
    { text: '删除', value: '1', type: 'error' },
    { text: '停用', value: '2', type: 'warning' }
  ];

  constructor(
    private http: _HttpClient, 
    private modalService: NzModalService,
    private i18nService: I18NService) { }

  ngOnInit() { 
    this.list(null);
  }

  searchBtnToggle() {
    this.sfHidden = !this.sfHidden;
  }
  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
  }

  add() {
    this.createModal(this.i18nService.fanyi('sys_module_op_create'), 'create', null);
  }

  view(record) {
    this.createModal(this.i18nService.fanyi('sys_module_op_view'), 'view', record);
  }

  edit(record: any) {
    this.createModal(this.i18nService.fanyi('sys_module_op_edit'), 'edit', record);
  }

  createModal(title, op, record) {
      const modal = this.modalService.create({
        nzTitle: title,
        nzWidth: 600,
        nzContent: SysModuleEditComponent,
        nzComponentParams: {
          op: op,
          record: record
        },
        nzFooter: [{
          label: this.i18nService.fanyi('base.append'),
          type: 'primary',
          disabled: ((form) => !form.validateForm.valid),
          onClick: (form) => {
            form.submitForm(form.validateForm.value);
          }
        }, {
          label: this.i18nService.fanyi('base.close'),
          onClick: () => modal.destroy()
        }],
        nzMaskClosable: false
      });
  
      modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  
      // Return a result when closed
      modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));
  }

  list(params: any) {
    this.loading = true;
    this.http.get<Result>(`api/module/list/${this.page}/${this.size}`, params)
      .pipe(
        map((result) => {
          let content = result.data.content;
          content.map((item) => {
            const statusItem = this.status[item.status];
            item.statusText = statusItem.text;
            item.statusType = statusItem.type;
          });
          return result;
        }),
        tap(() => this.loading = false)
      )
      .subscribe(res => {
      this.dataSet = res.data.content;
    });
  } 
}
