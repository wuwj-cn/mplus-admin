import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SysModuleEditComponent } from './edit/edit.component';
import { I18NService } from '@core/i18n/i18n.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Result } from '@core/result';
import { map, tap } from 'rxjs/operators';

enum Status {
  NORMAL = "0",
  // DELETED = "1",
  DISABLED = "2"
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
  displayData: any[];

  filterStatus = [
    { text: '正常', value: Status.NORMAL, type: 'success' },
    // { text: '删除', value: Status.DELETED, type: 'error' },
    { text: '停用', value: Status.DISABLED, type: 'warning' }
  ];

  sortMap = {
    status   : null
  };
  sortName = null;
  sortValue = null;

  constructor(
    private http: _HttpClient,
    private modalService: NzModalService,
    private msgSrv: NzMessageService,
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
            const index = this.filterStatus.findIndex(s => s.value === item.status);
            const statusItem = this.filterStatus[index];
            item.statusText = statusItem.text;
            item.statusType = statusItem.type;
          });
          return result;
        }),
        tap(() => this.loading = false)
      )
      .subscribe(res => {
        this.dataSet = res.data.content;
        this.displayData = [...this.dataSet];
      });
  }

  statusToggle(record: any): void {
    this.loading = true;
    if (record.status == Status.NORMAL) {
      record.status = Status.DISABLED;
    } else {
      record.status = Status.NORMAL;
    }
    this.http.put(`api/module/update`, record)
      .pipe(
        map((result) => {
          const index = this.filterStatus.findIndex(s => s.value === result.data.status);
          const statusItem = this.filterStatus[index];
          result.data.statusText = statusItem.text;
          result.data.statusType = statusItem.type;
          return result;
        }),
        tap(() => this.loading = false)
      )
      .subscribe(res => {
        const index = this.dataSet.findIndex(item => item.id === res.data.id);
        // this.dataSet[index] = res.data; 不能直接赋值，会导致双向绑定失效
        this.dataSet[index].statusText = res.data.statusText;
        this.dataSet[index].statusType = res.data.statusType;
        this.displayData = [...this.dataSet];
        this.msgSrv.success('更新成功');
      });
  }

  searchStatus = [];
  filterStatusChange(value: string[]): void {
    this.searchStatus = value;
    this.search();
  }

  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  search(): void {
    const filterFunc = (item) => {
      return (this.searchStatus.length ? this.searchStatus.some(status => item.status.indexOf(status) !== -1) : true);
    };
    const data = this.displayData.filter(item => filterFunc(item));
    this.dataSet = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }
}
