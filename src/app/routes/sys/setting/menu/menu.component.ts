import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STRes, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SysSettingMenuEditComponent } from './edit/edit.component';
import { MenuService } from './menu.service';

export interface TreeNode {
  key: number;
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

  constructor(private http: _HttpClient, private modal: ModalHelper,
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
          const target = array.find(a => a.key === d.key)!;
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
    if (!hashMap[ node.key ]) {
      hashMap[ node.key ] = true;
      array.push(node);
    }
  }

  load() {
    this.menuService.get().subscribe((data: any) => {
      this.listOfMapData = data.list;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[ item.key ] = this.convertTreeToList(item);
      })
    }); 
  }

  add(item?: any) {
    this.modal.createStatic(SysSettingMenuEditComponent, {  }).subscribe(res => {
      // this.st.reload();
    });
  }

}
