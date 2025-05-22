import { Component, inject } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubMenuItem } from '../../../../../core/models/menu.model';
import { NgTemplateOutlet } from '@angular/common';
import { SidebarSubmenuComponent } from './sidebar-submenu/sidebar-submenu.component';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    SidebarSubmenuComponent,
  ],
  templateUrl: './sidebar-menu.component.html',
  styles: ``,
})
export class SidebarMenuComponent {
  menuService = inject(MenuService);

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }
}
