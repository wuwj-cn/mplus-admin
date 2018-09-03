import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  sfHidden = true;
  searchForm: FormGroup;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  dataSet: any[] = [];

  constructor(private http: _HttpClient, private modal: ModalHelper, private fb: FormBuilder) { }

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

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  list(reset: boolean = false) {

  }

  delete() {

  }

}
