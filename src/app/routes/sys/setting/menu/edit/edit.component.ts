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
  @Input() record: any;
  i: any;

  schema: SFSchema = {
    properties: {
      parentCode: { type: 'string', title: '上级菜单' },
      menuCode: { type: 'string', title: '菜单编码' },
      menuName: { type: 'string', title: '菜单名称' },
      moduleName: { type: 'string', title: '归属模块' },
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
    $parentCode: {
      widget: 'tree-select', 
      asyncData: () => of(this.getMenuTree()).pipe(delay(300)),
      expandChange: (e: NzFormatEmitEvent) => {
        return of(this.getMenuTree(e.node.key)).pipe(delay(300));
      }
    },
    $moduleName: {
      widget: 'select', 
      asyncData: () => of(this.getModules()).pipe(delay(300))
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
    
    
    if (this.record !== undefined && this.record.id > 0) {
      // this.menuService.getByCode(this.record.menuCode)
      //                 .subscribe(res => this.i = res);
      this.i = this.record;
    } else {
      this.i = {};
    }
  }

  getModules() {
    let modules = [];
    this.moduleService.get().subscribe((data: any) => {
      data.list.forEach((item: any) => {
        modules.push({label: item.moduleName, value: item.id});
      });
    });
    return modules;
  }

  getMenuTree(menuCode: string = '0') {
    let nodes = [];
    this.menuService.getChildren(menuCode).subscribe((data: any) => {
      data.list.children.forEach((item: any) => {
        nodes.push({ title: item.menuName, key: item.menuCode })
      });
    });
    return nodes;
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
