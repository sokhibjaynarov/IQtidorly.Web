import { CONFIG } from 'src/config-global';

import { RegisteredUserView } from 'src/sections/users/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Page five | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <RegisteredUserView />;
}
