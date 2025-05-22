import { Component, inject } from '@angular/core';
import { APP_INFO } from '@app-info';
import { SvgIconComponent } from 'angular-svg-icon';
import { MenuService } from '../../services/menu.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuService = inject(MenuService);
  appJson = APP_INFO;

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
