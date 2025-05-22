import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@Component({
  selector: 'app-header',
  imports: [SvgIconComponent, NavbarMenuComponent, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {}
