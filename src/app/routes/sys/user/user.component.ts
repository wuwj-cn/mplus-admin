import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SysUserEditComponent } from './edit/edit.component';
import { I18NService } from '@core/i18n/i18n.service';
import { NzModalService } from 'ng-zorro-antd';

enum Status {
  NORMAL = "0",
  // DELETED = "1",
  DISABLED = "2"
}

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

  constructor(
    private http: _HttpClient, 
    private modal: ModalHelper, 
    private i18nService: I18NService,
    private modalService: NzModalService,
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
  }

  filterStatus = [
    { text: '正常', value: Status.NORMAL, type: 'success' },
    // { text: '删除', value: Status.DELETED, type: 'error' },
    { text: '停用', value: Status.DISABLED, type: 'warning' }
  ];

  sortMap = {
    status   : null
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
    this.http.get(this.apiUrl + `/list/${this.pageIndex-1}/${this.pageSize}`, this.searchForm.value)
      .subscribe((res: any) => {
        this.total = res.data.totalElements;
        this.dataSet = res.data.content;
        // this.displayData = [...this.dataSet];
        this.loading = false
      });
  }

  delete() {

  }

}
