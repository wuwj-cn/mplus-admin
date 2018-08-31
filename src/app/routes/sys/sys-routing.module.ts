import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysModuleComponent } from './module/module.component';
import { SysUserComponent } from './user/user.component';

const routes: Routes = [


  { path: 'module', component: SysModuleComponent },
  { path: 'user', component: SysUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
