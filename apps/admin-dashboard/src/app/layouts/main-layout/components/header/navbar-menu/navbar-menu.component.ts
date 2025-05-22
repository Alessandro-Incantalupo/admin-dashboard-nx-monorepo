import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { TieredMenu } from 'primeng/tieredmenu';
import { Ripple } from 'primeng/ripple';
import { Badge } from 'primeng/badge';
import { Toast } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../services/menu.service';
import { CustomMenuItem } from '../../../../../core/models/menu.model';
import { NavbarSubmenuComponent } from './navbar-submenu/navbar-submenu.component';

@Component({
  selector: 'app-navbar-menu',
  imports: [NgClass, NavbarSubmenuComponent],
  templateUrl: './navbar-menu.component.html',
  styles: ``,
})
export class NavbarMenuComponent {
  menuService = inject(MenuService);
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];

  public toggleMenu(menu: CustomMenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.hideMenuClass.forEach((c) => element.classList.remove(c));
      this.showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}
