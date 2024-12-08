import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  home: icon('home'),
  note: icon('note'),
  mortarboard: icon('mortarboard'),
  backpack: icon('backpack'),
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

export const navData = [
  {
    items: [
      { title: 'Diagnostik testlar', path: '/' },
      { title: 'Olimpiadalar', path: '/' },
      { title: 'Reytinglar', path: '/' },
      { title: 'Manbalar', path: '/' },
      { title: 'iQtidorly Shop', path: '/landing/books' },
      { title: 'Onlayn ta’lim', path: '/' },
      { title: 'Yordam', path: '/' },
    ],
  },
];
export const dashboardData = [
  {
    items: [
      { title: 'Asosiy', path: paths.dashboard.one, icon: ICONS.home },
      { title: 'Mening testlarim', path: paths.dashboard.two, icon: ICONS.note },
      { title: 'Mening olimpiadalarim', path: paths.dashboard.three, icon: ICONS.mortarboard },
      { title: 'Mening sinflarim', path: paths.dashboard.five, icon: ICONS.backpack },
      { title: 'Mening kitoblarim', path: paths.dashboard.books, icon: ICONS.file },
      { title: 'Muallif', path: paths.dashboard.author, icon: ICONS.job },
    ],
  },
];
