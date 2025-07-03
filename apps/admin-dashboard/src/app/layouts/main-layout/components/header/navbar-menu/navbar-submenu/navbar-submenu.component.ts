import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { SubMenuItem } from '../../../../../../core/models/menu.model';

@Component({
  selector: 'app-navbar-submenu',
  imports: [NgTemplateOutlet, RouterLinkActive, SvgIconComponent],
  templateUrl: './navbar-submenu.component.html',
  styles: ``,
})
export class NavbarSubmenuComponent {
  submenu = input<SubMenuItem[]>();
  router = inject(Router);

  toggleMenu(item: SubMenuItem): void {
    if (item.disabled) {
      toast.info('Feature under development');
      return;
    }
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
