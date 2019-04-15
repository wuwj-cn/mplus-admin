import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysModuleComponent } from './setting/module/module.component';
import { SysMenuComponent } from './setting/menu/menu.component';
import { SysUserComponent } from './org/user/user.component';
import { SysSettingModuleEditComponent } from './setting/module/edit/edit.component';
import { SysSettingMenuEditComponent } from './setting/menu/edit/edit.component';
import { SysOrgComponent } from './org/org/org.component';
import { SysOrgOrgEditComponent } from './org/org/edit/edit.component';
import { SysPostComponent } from './org/post/post.component';
import { SysOrgPostEditComponent } from './org/post/edit/edit.component';
import { SysDictComponent } from './setting/dict/dict.component';
import { SysSettingDictEditComponent } from './setting/dict/edit/edit.component';
import { SysSettingDictViewComponent } from './setting/dict/view/view.component';

const COMPONENTS = [
  SysModuleComponent,
  SysMenuComponent,
  SysUserComponent,
  SysOrgComponent,
  SysPostComponent,
  SysDictComponent];
const COMPONENTS_NOROUNT = [
  SysSettingModuleEditComponent,
  SysSettingMenuEditComponent,
  SysOrgOrgEditComponent,
  SysOrgPostEditComponent,
  SysSettingDictEditComponent,
  SysSettingDictViewComponent];

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
