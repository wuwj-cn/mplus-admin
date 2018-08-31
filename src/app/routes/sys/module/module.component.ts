import { Component, OnInit, Input } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { SysModuleEditComponent } from './edit/edit.component';
import { I18NService } from '@core/i18n/i18n.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  pageIndex = 1;
  pageSize = 10;
  total;
  searchForm: FormGroup;
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

  constructor(
    private http: _HttpClient,
    private modalService: NzModalService,
    private msgSrv: NzMessageService,
    private i18nService: I18NService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      moduleName: [''],
      moduleCode: [''],
      status: [''],
      sortProperties: [''],
      sortDirection: ['']
    });
    this.list();
  }

  searchBtnToggle() {
    this.sfHidden = !this.sfHidden;
  }
  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
  }

  resetForm(): void {
    this.searchForm.reset();
  }
  
  add() {
    this.createModal(this.i18nService.fanyi('sys_module_op_create'), 'create', "");
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
        label: this.i18nService.fanyi('base_save'),
        type: 'primary',
        disabled: ((form) => !form.validateForm.valid),
        onClick: (form) => {
          for (const key in form.validateForm.controls) {
            form.validateForm.controls[key].markAsDirty();
            form.validateForm.controls[key].updateValueAndValidity();
          }
          if (op === "create") {
            this.http.post(`api/module/add`, form.validateForm.value).subscribe((res: any) => {
              this.msgSrv.success('保存成功');
              this.list();
              modal.close(true);
            });
          } else if(op === "edit") {
            this.http.put(`api/module/update`, form.validateForm.value).subscribe(res => {
              this.msgSrv.success('保存成功');
              this.updateRowData(res.data);
              modal.close(true);
            });
          }
        }
      }, {
        label: this.i18nService.fanyi('base_close'),
        onClick: () => modal.destroy()
      }],
      nzMaskClosable: false
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));
  }

  list(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    this.loading = true;
    //后台分页, pageIndex从0开始
    this.http.get(`api/module/list/${this.pageIndex-1}/${this.pageSize}`, this.searchForm.value)
      .pipe(
        map((result: any) => {
          let content = result.data.content;
          content.map((item) => {
            this.mapStatus(item);
          });
          return result;
        }),
        tap(() => this.loading = false)
      )
      .subscribe(res => {
        this.total = res.data.totalElements;
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
        tap(() => this.loading = false)
      )
      .subscribe((res: any) => {
        this.updateRowData(res.data);
        this.msgSrv.success('更新成功');
      });
  }

  mapStatus(item: any) {
    const index = this.filterStatus.findIndex(s => s.value === item.status);
    const statusItem = this.filterStatus[index];
    item.statusText = statusItem.text;
    item.statusType = statusItem.type;
    return item;
  }

  updateRowData(item: any): void {
    const rowData = this.mapStatus(item);
    const index = this.displayData.findIndex(item => item.id === rowData.id);
    this.displayData.splice(index, 1, rowData);
    this.dataSet = [...this.displayData];
  }

  searchStatus = [];
  filterStatusChange(value: string[]): void {
    this.searchStatus = value;
    this.filter();
  }

  sort(sortName: string, value: string): void {
    // this.searchForm.value['sortProperties'] = sortName;
    // this.searchForm.value['sortDirection'] = value;
    this.searchForm.patchValue({'sortProperties': sortName, 'sortDirection': value});
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.filter();
  }

  filter(): void {
    const filterFunc = (item) => {
      return (this.searchStatus.length ? this.searchStatus.some(status => item.status.indexOf(status) !== -1) : true);
    };
    const data = this.displayData.filter(item => filterFunc(item));
    this.dataSet = data.sort((a, b) => (this.searchForm.value['sortDirection'] === 'ascend') ? 
      (a[ this.searchForm.value['sortProperties'] ] > b[ this.searchForm.value['sortProperties'] ] ? 1 : -1) : 
      (b[ this.searchForm.value['sortProperties'] ] > a[ this.searchForm.value['sortProperties'] ] ? 1 : -1));
  }
}
