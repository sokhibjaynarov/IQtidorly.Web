import { CONFIG } from 'src/config-global';

import { View404 } from 'src/sections/error/404-view';

// ----------------------------------------------------------------------

export const metadata = { title: `404 page not found! | Error - ${CONFIG.site.name}` };

export default function Page() {
  return <View404 />;
}
