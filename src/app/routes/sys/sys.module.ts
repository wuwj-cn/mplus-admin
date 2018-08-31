import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SysRoutingModule } from './sys-routing.module';
import { SysModuleComponent } from './module/module.component';
import { SysModuleEditComponent } from './module/edit/edit.component';
import { SysModuleViewComponent } from './module/view/view.component';
import { SysUserComponent } from './user/user.component';
import { SysUserEditComponent } from './user/edit/edit.component';
import { SysUserViewComponent } from './user/view/view.component';

const COMPONENTS = [
  SysModuleComponent,
  SysUserComponent];
const COMPONENTS_NOROUNT = [
  SysModuleEditComponent,
  SysModuleViewComponent,
  SysUserEditComponent,
  SysUserViewComponent];

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
