import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { CustomMenuItem } from '../../../../../core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { NavbarSubmenuComponent } from './navbar-submenu/navbar-submenu.component';

@Component({
  selector: 'app-navbar-menu',
  imports: [NgClass, NavbarSubmenuComponent, ChipModule],
  templateUrl: './navbar-menu.component.html',
  styles: ``,
})
export class NavbarMenuComponent {
  menuService = inject(MenuService);
  private showMenuClass = [
    'scale-100',
    'animate-fade-in-up',
    'opacity-100',
    'pointer-events-auto',
  ];
  private hideMenuClass = [
    'scale-95',
    'animate-fade-out-down',
    'opacity-0',
    'pointer-events-none',
  ];

  public toggleMenu(menu: CustomMenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.hideMenuClass.forEach(c => element.classList.remove(c));
      this.showMenuClass.forEach(c => element.classList.add(c));
    }
  }

  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.showMenuClass.forEach(c => element.classList.remove(c));
      this.hideMenuClass.forEach(c => element.classList.add(c));
    }
  }
}
