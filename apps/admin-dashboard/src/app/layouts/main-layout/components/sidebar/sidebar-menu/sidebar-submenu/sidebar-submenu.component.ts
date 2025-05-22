import { Component, inject, input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { MenuService } from '../../../../services/menu.service';
import { SubMenuItem } from '../../../../../../core/models/menu.model';

@Component({
  selector: 'app-sidebar-submenu',
  imports: [SvgIconComponent, RouterLinkActive, RouterLink, NgTemplateOutlet],
  templateUrl: './sidebar-submenu.component.html',
  styles: ``,
})
export class SidebarSubmenuComponent {
  menuService = inject(MenuService);
  submenu = input<SubMenuItem>();

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }
}
