import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysModuleComponent } from './setting/module/module.component';
import { SysMenuComponent } from './setting/menu/menu.component';
import { SysUserComponent } from './org/user/user.component';
import { SysOrgComponent } from './org/org/org.component';
import { SysPostComponent } from './org/post/post.component';
import { SysDeptComponent } from './org/dept/dept.component';

const routes: Routes = [

  { path: 'module', component: SysModuleComponent },
  { path: 'menu', component: SysMenuComponent },
  { path: 'user', component: SysUserComponent },
  { path: 'org', component: SysOrgComponent },
  { path: 'post', component: SysPostComponent },
  { path: 'dept', component: SysDeptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
