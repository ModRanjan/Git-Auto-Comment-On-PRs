import {
  DashboardIcon,
  FolderIcon,
  CalenderIcon,
  PeoplesIcon,
  AnalyticsIcon,
  SettingIcon,
} from '@/Atoms/Icon/CustomIcons';
import { SidebarNavItemType } from '@/types/SidebarNavigation';

export const SidebarNavigation: SidebarNavItemType[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
    current: true,
  },
  {
    name: 'Repos',
    href: '/repositories',
    icon: FolderIcon,
    current: false,
  },
  { name: 'PRs', href: '/prs', icon: CalenderIcon, current: false },
  { name: 'AI Guide', href: '/aiGuide', icon: PeoplesIcon, current: false },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: AnalyticsIcon,
    current: false,
  },
  {
    name: 'Settings',
    href: '/setting',
    icon: SettingIcon,
    current: false,
  },
];
