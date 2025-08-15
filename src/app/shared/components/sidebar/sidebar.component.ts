import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { UserRole } from '@app/core/enums';
import { IMenuItem } from '@app/shared/models/menu-item.model';
import { MenuService } from '@app/shared/services/menu.service';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe, CommonModule, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input({ required: true }) menuItems: IMenuItem[] = [];
  @Input({ required: true }) userRole: UserRole = UserRole.USER;

  protected readonly menuService = inject(MenuService);
}
