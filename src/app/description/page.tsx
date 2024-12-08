import { CONFIG } from 'src/config-global';

import DescriptionView from 'src/sections/description/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Landing - ${CONFIG.site.name}` };

export default function Page() {
  return <DescriptionView />;
}
