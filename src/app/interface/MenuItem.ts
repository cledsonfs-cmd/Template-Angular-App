export interface MenuItem {
    label: string;
    route?: string;
    icon?: string;
    expanded?: boolean;
    children?: MenuItem[];
  }
  