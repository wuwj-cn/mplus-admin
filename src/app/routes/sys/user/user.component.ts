import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SysUserEditComponent } from './edit/edit.component';
import { I18NService } from '@core/i18n/i18n.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Status } from '../enums/Status';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class SysUserComponent implements OnInit {
  apiUrl = `api/user`;
  sfHidden = true;
  searchForm: FormGroup;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  dataSet: any[] = [];

  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  status = [
    { index: 0, text: '关闭', value: false, type: 'default', checked: false },
    { index: 1, text: '运行中', value: false, type: 'processing', checked: false, },
    { index: 2, text: '已上线', value: false, type: 'success', checked: false },
    { index: 3, text: '异常', value: false, type: 'error', checked: false },
  ];

  expandForm = false;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private i18nService: I18NService,
    private modalService: NzModalService,
    private msgSrv: NzMessageService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      username: [''],
      nickName: [''],
      email: [''],
      status: [''],
      sortProperties: [''],
      sortDirection: ['']
    });
    this.list(true);
  }

  filterStatus = [
    { text: '正常', value: Status.NORMAL, type: 'success' },
    // { text: '删除', value: Status.DELETED, type: 'error' },
    { text: '停用', value: Status.DISABLED, type: 'warning' }
  ];

  sortMap = {
    status: null
  };

  searchBtnToggle() {
    this.sfHidden = !this.sfHidden;
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  createModal(title, op, record) {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: 600,
      nzContent: SysUserEditComponent,
      nzComponentParams: {
        op: op,
        record: record
      },
      nzFooter: [{
        label: this.i18nService.fanyi('base_save'),
        type: 'primary',
        disabled: ((form) => !form.userForm.valid),
        onClick: (component) => {
          component.save(component.userForm.value);

        }
      }, {
        label: this.i18nService.fanyi('base_close'),
        onClick: () => modal.destroy()
      }],
      nzMaskClosable: false
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => {
      this.list(true);
    });
  }

  add() {
    this.createModal(this.i18nService.fanyi('sys_user_op_create'), 'create', "");
  }

  list(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    this.loading = true;
    //后台分页, pageIndex从0开始
    this.http.get(this.apiUrl + `/list/${this.pageIndex - 1}/${this.pageSize}`, this.searchForm.value)
      .pipe(
        map((result: any) => {
          let content = result.data.content;
          content.map((item) => {
            this.mapStatus(item);
          });
          return result;
        })
      )
      .subscribe((res: any) => {
        this.loading = false;
        this.total = res.data.totalElements;
        this.dataSet = res.data.content;
        // this.displayData = [...this.dataSet];
      });
  }

  updateStatus(record: any): void {
    this.loading = true;
    if (record.status == Status.NORMAL) {
      record.status = Status.DISABLED;
    } else {
      record.status = Status.NORMAL;
    }
    this.http.put(`api/user/update`, record)
      .subscribe((res: any) => {
        this.list(false);
        this.msgSrv.success('更新成功');
      });
  }

  delete() {

  }

  mapStatus(item: any) {
    const index = this.filterStatus.findIndex(s => s.value === item.status);
    const statusItem = this.filterStatus[index];
    item.statusText = statusItem.text;
    item.statusType = statusItem.type;
    return item;
  }

}
