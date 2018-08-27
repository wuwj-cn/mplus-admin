import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SysModuleEditComponent } from './edit/edit.component';
import { I18NService } from '@core/i18n/i18n.service';
import { NzModalService } from 'ng-zorro-antd';
import { Result } from '@core/result';

@Component({
  selector: 'app-sys-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.less'],
})
export class SysModuleComponent implements OnInit {

  constructor(private http: _HttpClient, 
    private modalService: NzModalService,
    private i18nService: I18NService) { }

  ngOnInit() { 
    
  }

  add() {
    this.createModal(this.i18nService.fanyi('sys_module_op_create'), 'create', null);
  }

  view(record) {
    this.createModal(this.i18nService.fanyi('sys_module_op_view'), 'view', record);
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

  sfHidden = true;
  isCollapse = true;
  searchBtnToggle() {
    this.sfHidden = !this.sfHidden;
  }
  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
  }

  @Input() page = 1;
  @Input() size = 10;
  dataSet = [];
  list(params: any) {
    this.http.get<Result>(`api/module/list/${this.page}/${this.size}`, params).subscribe(res => {
      this.dataSet = res.data.content;
    });
  }

}
