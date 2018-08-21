import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysModuleComponent } from './module/module.component';

const routes: Routes = [


  { path: 'module', component: SysModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
