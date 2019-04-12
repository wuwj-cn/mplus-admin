import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysModuleComponent } from './setting/module/module.component';
import { SysMenuComponent } from './setting/menu/menu.component';
import { SysUserComponent } from './org/user/user.component';
import { SysPostComponent } from './org/post/post.component';
import { SysSettingModuleEditComponent } from './setting/module/edit/edit.component';
import { SysSettingMenuEditComponent } from './setting/menu/edit/edit.component';
import { SysDeptComponent } from './org/dept/dept.component';
import { SysOrgDeptEditComponent } from './org/dept/edit/edit.component';
import { SysOrgDeptViewComponent } from './org/dept/view/view.component';
import { SysOrgComponent } from './org/org/org.component';
import { SysOrgOrgEditComponent } from './org/org/edit/edit.component';

const COMPONENTS = [
  SysModuleComponent,
  SysMenuComponent,
  SysUserComponent,
  SysPostComponent,
  SysDeptComponent,
  SysOrgComponent];
const COMPONENTS_NOROUNT = [
  SysSettingModuleEditComponent,
  SysSettingMenuEditComponent,
  SysOrgDeptEditComponent,
  SysOrgDeptViewComponent,
  SysOrgOrgEditComponent];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule { }
