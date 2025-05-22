import { AfterViewInit, Component, ElementRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { SubMenuItem } from '../../../../../../core/models/menu.model';

@Component({
  selector: 'app-navbar-submenu',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, SvgIconComponent],
  templateUrl: './navbar-submenu.component.html',
  styles: ``,
})
export class NavbarSubmenuComponent {
  submenu = input<SubMenuItem[]>();
}
