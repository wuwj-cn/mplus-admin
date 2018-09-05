import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sys-user-edit',
  templateUrl: './edit.component.html',
})
export class SysUserEditComponent implements OnInit {
  apiUrl = "api/user";
  record: any = {};
  user: any;
  userForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      nickName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email   : ['', [Validators.required, Validators.email]]
    });
    if (this.record && this.record.id != null) {
      this.http.get(this.apiUrl + `/list/${this.record.id}`).subscribe((res: any) => (this.user = res.data));
    }
  }

  save(value: any) {
    this.http.post(this.apiUrl + `/add`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
