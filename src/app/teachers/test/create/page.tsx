import { CONFIG } from 'src/config-global';

import CreateTestView from 'src/sections/questions/content/create-test';

// ----------------------------------------------------------------------

export const metadata = { title: `Test | Teacher - ${CONFIG.site.name}` };

export default function Page() {
  return <CreateTestView />;
}
