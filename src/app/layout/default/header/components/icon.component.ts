import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'header-icon',
  template: `
  <div class="alain-default__nav-item" nz-dropdown nzTrigger="click" nzPlacement="bottomRight" 
      (nzVisibleChange)="change()" [nzDropdownMenu]="menuTpl"> 
    <i nz-icon nzType="appstore"></i> 
  </div>
  <nz-dropdown-menu class="wd-xl animated jello" #menuTpl="nzDropdownMenu">
    <nz-spin [nzSpinning]="loading" [nzTip]="'正在读取数据...'">
    <div nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="app-icons">
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="calendar" class="bg-error text-white"></i> 
        <small>Calendar</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="file" class="bg-geekblue text-white"></i> 
        <small>Files</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="cloud" class="bg-success text-white"></i> 
        <small>Cloud</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="star-o" class="bg-magenta text-white"></i> 
        <small>Star</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="team" class="bg-purple text-white"></i> 
        <small>Team</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="scan" class="bg-warning text-white"></i> 
        <small>QR</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="pay-circle-o" class="bg-cyan text-white"></i> 
        <small>Pay</small>
      </div>
      <div nz-col [nzSpan]="6">
        <i nz-icon nzType="printer" class="bg-grey text-white"></i> 
        <small>Print</small>
      </div>
    </div>
  </nz-spin>
  </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderIconComponent {
  loading = true;

  constructor(private cdr: ChangeDetectorRef) { }

  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
