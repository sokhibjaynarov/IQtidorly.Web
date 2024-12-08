import { CONFIG } from 'src/config-global';

import DescriptionView from 'src/sections/description/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Description - ${CONFIG.site.name}` };

export default function Page() {
  return <DescriptionView />;
}
