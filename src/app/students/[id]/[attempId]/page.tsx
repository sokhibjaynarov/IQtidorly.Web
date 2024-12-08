import { CONFIG } from 'src/config-global';

import { DiagnosticTestView } from 'src/sections/diagnosticTest/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Description - ${CONFIG.site.name}` };

export default function Page() {
  return <DiagnosticTestView />;
}
