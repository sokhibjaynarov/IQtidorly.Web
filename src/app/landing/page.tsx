import { CONFIG } from 'src/config-global';

import { LandingView } from 'src/sections/landing/landing-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Landing - ${CONFIG.site.name}` };

export default function Page() {
  return <LandingView />;
}
