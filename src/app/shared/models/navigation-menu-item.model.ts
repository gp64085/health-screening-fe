import type { UserRole } from '@app/core/enums';

export interface NavigationMenuItem {
  label: string;
  icon?: string;
  route?: string;
  roles?: UserRole[];
  children?: NavigationMenuItem[];
  expanded?: boolean;
  visible?: boolean;
  disabled?: boolean;
  click?: () => void;
}
