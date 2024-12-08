import { CONFIG } from 'src/config-global';

import { MainView } from 'src/sections/main-teachers/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <MainView />;
}
