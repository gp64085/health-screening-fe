import type { UserRole } from '@app/core/enums';

export interface IMenuItem {
  label: string;
  icon?: string;
  route?: string;
  roles?: UserRole[];
  children?: IMenuItem[];
  expanded?: boolean;
  visible?: boolean;
  disabled?: boolean;
}
