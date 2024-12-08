import { CONFIG } from 'src/config-global';

import { ResultView } from 'src/sections/results/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Result - ${CONFIG.site.name}` };

export default function Page() {
  return <ResultView />;
}
