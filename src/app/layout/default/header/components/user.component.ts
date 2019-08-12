import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `
  <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="menuTpl">
    <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
    {{settings.user.name}}
  </div>
  <nz-dropdown-menu class="width-sm" #menuTpl="nzDropdownMenu">
    <ul nz-menu>
      <li nz-menu-item routerLink="/pro/account/center">
        <i nz-icon type="user" class="mr-sm"></i>
        {{ 'menu.account.center' | translate }}
      </li>
      <li nz-menu-item routerLink="/pro/account/settings">
        <i nz-icon type="setting" class="mr-sm"></i>
        {{ 'menu.account.settings' | translate }}
      </li>
      <li nz-menu-item routerLink="/exception/trigger">
        <i nz-icon type="close-circle" class="mr-sm"></i>
        {{ 'menu.account.trigger' | translate }}
      </li>
      <li nz-menu-divider></li>
      <li nz-menu-item (click)="logout()">
        <i nz-icon type="logout" class="mr-sm"></i>
        {{ 'menu.account.logout' | translate }}
      </li>
    </ul>
  </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
