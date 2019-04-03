import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { ModuleService } from '../../module/module.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-sys-setting-menu-edit',
  templateUrl: './edit.component.html',
})
export class SysSettingMenuEditComponent implements OnInit {
  @Input() record: any = {};
  i: any;
  moduleList = [];
  menuList = [];

  schema: SFSchema = {
    properties: {
      parentCode: { type: 'string', title: '上级菜单', 
        ui: {
          widget: 'tree-select', 
          asyncData: () => of(this.menuList).pipe(delay(300)),
          expandChange: (e: NzFormatEmitEvent) => {
            let nodes = [];
            this.menuService.getChildren(e.node.key).subscribe((data: any) => {
              data.list.children.forEach((item: any) => {
                nodes.push({ title: item.menuName, key: item.menuCode })
              });
            });
            return of(nodes).pipe(delay(300));
          }
        }  
      },
      menuCode: { type: 'string', title: '菜单编码' },
      menuName: { type: 'string', title: '菜单名称' },
      moduleName: { type: 'string', title: '归属模块', 
        ui: { widget: 'select', asyncData: () => of(this.moduleList).pipe(delay(300))} },
      href: { type: 'string', title: '链接' },
      isVisible: { type: 'string', title: '可见', enum: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' }
      ], default: '0', ui: { widget: 'select' } },
      remark: { type: 'string', title: '备注' }
    },
    required: ['menuCode', 'menuName', 'moduleName', 'href'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 24},
      autosize: { minRows: 2, maxRows: 6 }
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private moduleService: ModuleService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.moduleService.get().subscribe((data: any) => {
      data.list.forEach((item: any) => {
        this.moduleList.push({label: item.moduleName, value: item.id});
      });
    });
    this.menuService.getChildren('0').subscribe((data: any) => {
      data.list.children.forEach((item: any) => {
        this.menuList.push({ title: item.menuName, key: item.menuCode })
      });
    });
    if (this.record !== undefined && this.record.id > 0) {
      this.menuService.getByCode(this.record.menuCode)
                      .subscribe(res => this.i = res);
    } else {
      this.i = {};
    }
  }
  
  save(value: any) {
    this.menuService.save(value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
