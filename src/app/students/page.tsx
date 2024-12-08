import { CONFIG } from 'src/config-global';

import { StundentView } from 'src/sections/students/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Landing - ${CONFIG.site.name}` };

export default function Page() {
  return <StundentView />;
}
