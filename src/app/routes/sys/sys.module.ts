import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysModuleComponent } from './sys_setting/module/module.component';
import { SysMenuComponent } from './sys_setting/menu/menu.component';
import { SysUserComponent } from './org/user/user.component';
import { SysOrgComponent } from './org/org/org.component';
import { SysPostComponent } from './org/post/post.component';

const COMPONENTS = [
  SysModuleComponent,
  SysMenuComponent,
  SysUserComponent,
  SysOrgComponent,
  SysPostComponent];
const COMPONENTS_NOROUNT = [
  ];

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
