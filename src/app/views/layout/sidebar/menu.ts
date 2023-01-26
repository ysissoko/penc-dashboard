import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Accueil',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Categories',
    icon: 'folder-plus',
    link: '/categories'
  },
  {
    label: 'Sous-categories',
    icon: 'folder-plus',
    link: '/subcategories'
  },
  {
    label: 'Zones',
    icon: 'map',
    link: '/zones'
  }
];
