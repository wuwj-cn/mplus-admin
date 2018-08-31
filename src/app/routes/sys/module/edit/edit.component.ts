import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sys-module-edit',
  templateUrl: './edit.component.html',
})
export class SysModuleEditComponent implements OnInit {
  @Input() op: string;
  @Input() record: any = {};
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      moduleName: [this.record.moduleName, [Validators.required]],
      moduleCode: [this.record.moduleCode, [Validators.required]],
      moduleDesc: [this.record.moduleDesc],
      version: [this.record.version],
      status: [this.record.status],
      id: [this.record.id]
    });
  }
}
