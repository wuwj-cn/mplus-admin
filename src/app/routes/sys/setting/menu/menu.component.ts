import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SysSettingMenuEditComponent } from './edit/edit.component';
import { MenuService } from './menu.service';
import { NzMessageService } from 'ng-zorro-antd';

export interface TreeNode {
  id: string;
  menuName: string;
  moduleName: string;
  url: string;
  isVisible: string;
  level: number;
  expand: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'app-sys-menu',
  templateUrl: './menu.component.html',
})
export class SysMenuComponent implements OnInit {
  url = `/sys/menu`;

  constructor(
    private msgSrv: NzMessageService,
    private modal: ModalHelper,
    private menuService: MenuService) { }

  ngOnInit() {
    this.load(); 
  }

  listOfMapData = [];
  mapOfExpandedData: { [ key: string ]: TreeNode[] } = {};

  collapse(array: TreeNode[], data: TreeNode, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNode[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNode, hashMap: { [ key: string ]: any }, array: TreeNode[]): void {
    if (!hashMap[ node.id ]) {
      hashMap[ node.id ] = true;
      array.push(node);
    }
  }

  load() {
    this.menuService.get().subscribe((data: any) => {
      this.listOfMapData = data.list.children;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[ item.id ] = this.convertTreeToList(item);
      })
    }); 
  }

  add(item?: any) {
    this.modal.createStatic(SysSettingMenuEditComponent, { record: item }).subscribe(() => {
      this.load();
    });
  }

  delete(menuCode: string) {
    this.menuService.delete(menuCode).subscribe(() => {
      this.msgSrv.success('删除成功');
      this.load();
    })
  }
}
