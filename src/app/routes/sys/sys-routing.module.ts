import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysModuleComponent } from './sys_setting/module/module.component';
import { SysMenuComponent } from './sys_setting/menu/menu.component';
import { SysUserComponent } from './org/user/user.component';
import { SysOrgComponent } from './org/org/org.component';
import { SysPostComponent } from './org/post/post.component';

const routes: Routes = [

  { path: 'module', component: SysModuleComponent },
  { path: 'menu', component: SysMenuComponent },
  { path: 'user', component: SysUserComponent },
  { path: 'org', component: SysOrgComponent },
  { path: 'post', component: SysPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
