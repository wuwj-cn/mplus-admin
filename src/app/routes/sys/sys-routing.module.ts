import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysModuleComponent } from './setting/module/module.component';
import { SysMenuComponent } from './setting/menu/menu.component';
import { SysOrgComponent } from './org/org/org.component';
import { SysPostComponent } from './org/post/post.component';
import { SysDictComponent } from './setting/dict/dict.component';
import { SysUserComponent } from './org/user/user.component';

const routes: Routes = [

  { path: 'module', component: SysModuleComponent },
  { path: 'menu', component: SysMenuComponent },
  { path: 'org', component: SysOrgComponent },
  { path: 'post', component: SysPostComponent },
  { path: 'dict', component: SysDictComponent },
  { path: 'user', component: SysUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
