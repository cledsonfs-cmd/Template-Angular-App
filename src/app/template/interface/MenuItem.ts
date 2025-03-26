export interface MenuItem {
    label: string;
    icon?: string;
    route?: string;
    children?: MenuItem[];
}