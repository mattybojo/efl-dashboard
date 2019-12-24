import { NbMenuItem } from '@nebular/theme';

export const EFL_MENU_ITEMS: NbMenuItem[] = [
  { title: 'Dashboard', link: '/dashboard', icon: { icon: 'table', pack: 'solid' } },
  { title: 'Matches', link: '/matches', icon: { icon: 'futbol', pack: 'solid' }, queryParams: {date: 'latest'} },
  { title: 'Team Picker', link: '/team-picker', icon: { icon: 'users', pack: 'solid' } },
  { title: 'MOTM Vote', link: '/motm-voting', icon: { icon: 'star', pack: 'solid' } },
  { title: 'Changelog', link: '/changelog', icon: { icon: 'clipboard-list', pack: 'solid' } },
];

export const EFL_ADMIN_MENU_ITEMS: NbMenuItem[] = [
    { title: 'Admin', icon: { icon: 'user-lock', pack: 'solid' }, children: [
      { title: 'Matches', link: '/admin/matches', icon: { icon: 'futbol', pack: 'solid' }, queryParams: {date: 'latest'} },
      { title: 'Team Picker', link: '/admin/team-picker', icon: { icon: 'users', pack: 'solid' } },
      { title: 'MOTM Vote', link: '/admin/motm-voting', icon: { icon: 'star', pack: 'solid' } },
  ]},
];
