import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { NavigationMenuItem } from '@app/shared/models/navigation-menu-item.model';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'li[appSidebarItem]',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule, Menu],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  menuItem = input.required<NavigationMenuItem>();
  protected menu = viewChild<Menu>('menu');
  protected isMenuVisible = signal<boolean>(false);
  protected childMenuItem = signal<MenuItem[]>([]);

  showMenu(event: MouseEvent, childMenus: NavigationMenuItem[] | undefined): void {
    const menuItems: MenuItem[] =
      childMenus?.map((menuItem) => {
        return {
          label: menuItem.label,
          icon: menuItem.icon,
          routerLink: menuItem.route,
          items: menuItem.children?.map((childMenuItem) => {
            return {
              label: childMenuItem.label,
              icon: childMenuItem.icon,
              routerLink: childMenuItem.route,
            };
          }),
        };
      }) ?? [];
    this.childMenuItem.set(menuItems);
    this.isMenuVisible.set(true);
    this.menu()?.show(event);
  }

  hideMenu(): void {
    this.isMenuVisible.set(false);
    this.menu()?.hide();
  }
}
